const crypto = require('crypto');

class Block {
    constructor(index, timestamp, transactions, previousHash = '', nonce = 0) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions; // Stores transactions in each block
        this.previousHash = previousHash;
        this.nonce = nonce; // Used for Proof-of-Work
        this.hash = this.calculateHash();
    }

    // Calculate block hash using SHA-256
    calculateHash() {
        return crypto.createHash('sha256')
            .update(this.index + this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce)
            .digest('hex');
    }

    // Proof-of-Work: Mines a block by finding a valid hash based on difficulty
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Transaction {
    constructor(sender, receiver, amount) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.signature = null; // Digital signature for validation
    }

    // Sign the transaction using sender's private key (Extra Feature: Digital Signature)
    signTransaction(privateKey) {
        const sign = crypto.createSign('SHA256');
        sign.update(JSON.stringify({ sender: this.sender, receiver: this.receiver, amount: this.amount })).end();
        this.signature = sign.sign(privateKey, 'hex');
    }

    // Validate transaction signature using sender's public key (Extra Feature: Signature Verification)
    isValid() {
        if (!this.sender || !this.signature) return false;
        const verify = crypto.createVerify('SHA256');
        verify.update(JSON.stringify({ sender: this.sender, receiver: this.receiver, amount: this.amount })).end();
        return verify.verify(this.sender, this.signature, 'hex');
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]; // Blockchain starts with the Genesis Block
        this.difficulty = 2; // Initial mining difficulty
        this.pendingTransactions = []; // Pool of pending transactions before mining
        this.miningReward = 50; // Reward for mining a block (Extra Feature: Mining Rewards)
    }

    // Create the Genesis Block (first block in the chain)
    createGenesisBlock() {
        return new Block(0, Date.now().toString(), "Genesis Block", "0");
    }

    // Get the latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add a new transaction to the pending transactions pool
    addTransaction(transaction) {
        if (!transaction.isValid()) {
            throw new Error("Invalid transaction!");
        }
        this.pendingTransactions.push(transaction);
    }

    // Mine pending transactions into a new block and reward the miner
    minePendingTransactions(minerAddress) {
        let block = new Block(this.chain.length, Date.now().toString(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);

        console.log(`Block Mined! ➝ Hash: ${block.hash}`);

        this.chain.push(block);

        // Reward miner with a new transaction (Extra Feature: Reward for Mining)
        this.pendingTransactions = [new Transaction("System", minerAddress, this.miningReward)];
    }

    // Verify the blockchain's integrity
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false; // Block hash is tampered
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false; // Blockchain linkage is broken
            }
        }
        return true;
    }

    // Adjust difficulty dynamically based on mining time (Extra Feature: Dynamic Difficulty Adjustment)
    adjustDifficulty() {
        if (this.chain.length < 2) return;

        const lastBlock = this.chain[this.chain.length - 1];
        const previousBlock = this.chain[this.chain.length - 2];

        const timeTaken = lastBlock.timestamp - previousBlock.timestamp;
        if (timeTaken < 5000) {
            this.difficulty++; // Increase difficulty if mining is too fast
        } else if (this.difficulty > 1) {
            this.difficulty--; // Decrease difficulty if mining is too slow
        }
    }
}

module.exports = { Blockchain, Block, Transaction };