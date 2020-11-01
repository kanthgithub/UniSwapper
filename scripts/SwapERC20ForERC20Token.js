let Web3 = require("web3");
const Tx = require('ethereumjs-tx')
const uniswapExchangeContractAbi = require('../abi/exchange.json');
let web3 = new Web3(
    new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/v3/e16ecf41380f442987d31e736990fed2'
    )
  );
  
// the address that will send the test transaction
const transactionMaker = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const transactionMakerPrivateKey = '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';

// the exchange contract address of ERC20 Token
const uniSwapExchangeContractAddress = '0x0da1e0d8ca4364f944bd98ac4d7760d574a12797'

//chain-link-Token Address on Ropsten
const chainLinkTokenAddress = '0x20fE562d797A42Dcb3399062AE9546cd06f63280';

const contract = new web3.eth.Contract(
  uniswapExchangeContractAbi,
  uniSwapExchangeContractAddress
);

const DEADLINE = 1742680400 // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp
const max_linkTokens_For_Purchase = web3.utils.toWei('10','Ether') // 10 link tokens
const max_linkTokens_Tokens_For_Sale = web3.utils.toWei('50','Ether') 
const max_Eth_For_Spending = web3.utils.toWei('1','Ether') // 1 ETH

const tx = contract.methods.tokenToTokenTransferOutput(
  max_linkTokens_For_Purchase,
  max_linkTokens_Tokens_For_Sale,
  max_Eth_For_Spending,
  DEADLINE,
  transactionMaker,
  chainLinkTokenAddress);

const encodedABI = tx.encodeABI();

// Signs the given transaction data and sends it.
function sendSigned(txData, cb) {
  const privateKey = new Buffer(transactionMakerPrivateKey, 'hex')
  const transaction = new Tx(txData)
  transaction.sign(privateKey)
  const serializedTx = transaction.serialize().toString('hex')
  web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
}

// get the number of transactions sent so far so we can create a fresh nonce
web3.eth.getTransactionCount(transactionMaker).then(txCount => {

  // construct the transaction data
  const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(6000000),
    gasPrice: web3.utils.toHex(10000000000), // 10 Gwei
    to: uniSwapExchangeContractAddress,
    from: transactionMaker,
    data: encodedABI
  }

  // fire away!
  sendSigned(txData, function(err, result) {
    if (err) return console.log('error', err)
    console.log('sent', result)
  })

})