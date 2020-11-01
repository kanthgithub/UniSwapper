// create a new Uniswap Exchange contract via Uniswap Factory contract - createExchange
let Web3 = require("web3");
const Tx = require('ethereumjs-tx')
const uniswapExchangeFactoryAbi = require('../abi/factory.json');

let web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/e16ecf41380f442987d31e736990fed2"));

// the account address that will submit the transaction
const addressFrom = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const privKey = '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';

// the Uniswap factory contract address
const addressTo = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'

//LakshmiKanthToken Contract Address
const lakshmiKanthTokenContractAddress = '0x832f1854532927A061790E8d1E432C66985ecA29';

const contract = new web3.eth.Contract(JSON.parse(uniswapExchangeFactoryAbi), addressTo);
const tx = contract.methods.createExchange(lakshmiKanthTokenContractAddress);
const encodedABI = tx.encodeABI();

function sendSigned(txData, cb) {
  const privateKey = new Buffer(privKey, 'hex')
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}
// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(addressFrom).then(txCount => {

  // construct the transaction data
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(10000000000),
    to: addressTo,
    from: addressFrom,
    data: encodedABI
  }

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })

});
