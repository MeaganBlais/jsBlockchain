const SHA256 = require('crypto-js/sha256')


class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2018', 'Genesis block', '0');
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let randomCoin = new Blockchain();
randomCoin.addBlock(new Block(1, "17/02/2018", { amount: 4}));
randomCoin.addBlock(new Block(2, "26/02/2018", { amount: 10}));


console.log(JSON.stringify(randomCoin, null, 4))