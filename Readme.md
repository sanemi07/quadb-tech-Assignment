# Blockchain Assignment

This project is a simple blockchain implementation in JavaScript using Node.js. It includes basic blockchain functionalities such as transaction management, block mining, and chain validation. Additionally, it features digital signatures, mining rewards, and dynamic difficulty adjustment.

## Features
- **Blockchain Structure**: Implements a basic blockchain with blocks containing transactions.
- **Proof-of-Work (Mining)**: Uses a nonce and difficulty level to mine blocks.
- **Transactions**: Allows sending transactions between users with digital signatures.
- **Blockchain Integrity Check**: Ensures the validity of the blockchain.
- **Mining Rewards**: Rewards miners with coins for successfully mining a block.
- **Dynamic Difficulty Adjustment**: Adjusts mining difficulty based on block mining time.

## Files Overview

### `blockchain.js`
Contains the main blockchain logic, including:
- `Block`: Defines a block with hash calculations and mining.
- `Transaction`: Defines transactions with digital signatures for security.
- `Blockchain`: Manages the blockchain, verifies integrity, and adjusts difficulty dynamically.

### `test.js`
Demonstrates the blockchain functionality by:
- Creating key pairs for Alice and Bob.
- Generating and signing transactions.
- Adding transactions to the blockchain.
- Mining blocks and rewarding miners.
- Checking blockchain validity before and after tampering.

## How to Run

### Prerequisites
Make sure you have **Node.js** installed on your system.

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/sanemi07/quadb-tech-Assignment
   ```
2. Navigate to the project directory:
   ```sh
   cd SIMPLEBLOCKCHAIN
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the test file:
   ```sh
   node test.js
   ```

## Expected Output
- Displays the process of mining blocks.
- Shows blockchain validity before and after tampering.
- Outputs JSON representation of the blockchain.

## Author
**Arjun Kumar Tripathi**

