const Blockchain = require("./Blockchain");
const bitcoin = new Blockchain();

// Step 1: Add a few transactions
const tx1 = bitcoin.createNewTransaction(
    "patient1",
    "hospital1",
    "Dr. Strange",
    "2025-08-04",
    "Routine checkup",
    "All clear"
);

const tx2 = bitcoin.createNewTransaction(
    "patient2",
    "hospital2",
    "Dr. House",
    "2025-08-03",
    "Fever and fatigue",
    "Flu"
);

// Step 2: Add transactions to pending
bitcoin.addTransactionToPendingTransactions(tx1);
bitcoin.addTransactionToPendingTransactions(tx2);

// Step 3: Mine the block
const previousBlock = bitcoin.getLastBlock();
const previousHash = previousBlock.hash;
const currentData = {
    transactions: bitcoin.pendingTransactions,
    index: previousBlock.index + 1,
};
const nonce = bitcoin.proofOfWork(previousHash, currentData);
const blockHash = bitcoin.hashBlock(previousHash, currentData, nonce);
const newBlock = bitcoin.createNewBlock(nonce, previousHash, blockHash);

console.log("\n🧱 New block mined:\n", newBlock);
console.log("\n✅ Is chain valid? ", bitcoin.chainIsValid(bitcoin.chain));
console.log("\n📜 Full Blockchain:\n", JSON.stringify(bitcoin, null, 2));
