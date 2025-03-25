const { Blockchain, Block, Transaction } = require('./blockchain');
const crypto = require('crypto');

// Generate key pair for signing transactions
const generateKeyPair = () => {
    return crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { type: 'spki', format: 'pem' },
        privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
};

// Create key pairs for Alice and Bob
const aliceKeys = generateKeyPair();
const bobKeys = generateKeyPair();

// Initialize Blockchain
const myBlockchain = new Blockchain();

// Create transactions and sign them
const transaction1 = new Transaction(aliceKeys.publicKey, bobKeys.publicKey, 10);
transaction1.signTransaction(aliceKeys.privateKey);
myBlockchain.addTransaction(transaction1);

const transaction2 = new Transaction(bobKeys.publicKey, aliceKeys.publicKey, 5);
transaction2.signTransaction(bobKeys.privateKey);
myBlockchain.addTransaction(transaction2);

// Mine a block with pending transactions
console.log("Mining first block...");
myBlockchain.minePendingTransactions(aliceKeys.publicKey);

// Validate blockchain integrity
console.log("Checking Blockchain Validity:");
console.log("Is blockchain valid?", myBlockchain.isChainValid());

// Attempt to tamper with blockchain data
console.log("\nTampering with Blockchain...");
myBlockchain.chain[1].transactions[0].amount = 1000;

// Revalidate blockchain integrity after tampering
console.log("Rechecking Blockchain Validity:");
console.log("Is blockchain valid after tampering?", myBlockchain.isChainValid());

// Display Blockchain Data
console.log("\nBlockchain Data:");
console.log(JSON.stringify(myBlockchain, null, 2));
