// create a new Uniswap Exchange contract via Uniswap Factory contract - createExchange
let Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const uniswapExchangeFactoryAbi = require('../abi/factory.json');

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/e16ecf41380f442987d31e736990fed2'
  )
);

// the account address that will submit the transaction
const addressFrom = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const privKey =
  '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';

// the Uniswap factory contract address
const uniswapExchangeFactoryAddress = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351';

//LakshmiKanthToken Contract Address
const lakshmiKanthTokenContractAddress =
  '0x832f1854532927A061790E8d1E432C66985ecA29';

const contract = new web3.eth.Contract(
    uniswapExchangeFactoryAbi,
  uniswapExchangeFactoryAddress
);
const tx = contract.methods.createExchange(lakshmiKanthTokenContractAddress);
const encodedABI = tx.encodeABI();

//function to send RawTransaction
async function sendRawTransaction(txData, tx, privateKey) {
  var txCount = await web3.eth.getTransactionCount(addressFrom);
  console.log(`transactionCount to be used as nonce: ` + txCount);

  var txDat = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(8000000),
    gasPrice: web3.utils.toHex(10000000000),
    to: uniswapExchangeFactoryAddress,
    from: addressFrom,
    data: encodedABI,
  };

  //sign transaction
  try {
    var signedTx = await web3.eth.accounts.signTransaction(
      txDat,
      '0x' + privKey
    );
    console.log(`Signed…`);
  } catch (e) {
    console.error(e);
  }

  //send signed transaction
  try {
    const transactionhash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(`Transaction done.`+transactionhash);
  } catch (e) {
    console.error(e);
  }
}

sendRawTransaction();
