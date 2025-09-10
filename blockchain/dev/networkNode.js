const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./Blockchain");

const app = express();
const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Get entire blockchain
app.get("/blockchain", (req, res) => {
    res.send(bitcoin);
});

// Create a new transaction
app.post("/transaction", (req, res) => {
    const newTransaction = req.body;
    const blockIndex =
        bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({ note: `Transaction will be added in block ${blockIndex}.` });
});

// Mine a new block
app.get("/mine", (req, res) => {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock["hash"];
    const currentBlockData = {
        transactions: bitcoin.pendingTransactions,
        index: lastBlock["index"] + 1,
    };
    const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = bitcoin.hashBlock(
        previousBlockHash,
        currentBlockData,
        nonce
    );
    const newBlock = bitcoin.createNewBlock(
        nonce,
        previousBlockHash,
        blockHash
    );

    res.json({
        note: "New block mined successfully",
        block: newBlock,
    });
});

const port = 3001;
app.listen(port, () => {
    console.log(`✅ Blockchain node listening on port ${port}`);
});
