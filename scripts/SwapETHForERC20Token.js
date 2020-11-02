const uniswapExchangeContractAbi = require('../abi/exchange.json');
const TransactionHandler = require('../utils/TransactionHandler');

// the address that will send the test transaction
const transactionMaker = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const transactionMakerPrivateKey =
  '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';

// the exchange contract address of ERC20 Token
const exchangeContractAddress_LakshmiKanthToken =
  '0x0da1e0d8ca4364f944bd98ac4d7760d574a12797';

//LakshmiKanthToken Contract Address
const lakshmiKanthTokenContractAddress =
  '0x832f1854532927A061790E8d1E432C66985ecA29';

const SwapETHForERC20 = {

  swap: (etherToSpend) => {
    const contract = TransactionHandler.loadContract(uniswapExchangeContractAbi, process.env.exchangeContractAddress_LakshmiKanthToken);
    
    //100 lakshmiKanth Tokens to be approved for spending by exchangeContractAddress_LakshmiKanthToken
    const etherToSpendForERC20 = TransactionHandler.toHex(etherToSpend * 10 ** 16); // 0.05 ETH

    console.log(
      `etherToSpendForERC20: ${etherToSpendForERC20} - inEth: ${TransactionHandler.fromWei(
        etherToSpendForERC20
      )}`
    );

    // get the number of transactions sent so far so we can create a fresh nonce
    const nonceForTxn = await TransactionHandler.getNonce(transactionMaker);

    const DEADLINE = 1742680400; // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp
    const tx = contract.methods.ethToTokenSwapInput(1, DEADLINE);

    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(nonceForTxn),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: exchangeContractAddress_LakshmiKanthToken,
      from: transactionMaker,
      data: tx.encodeABI(),
      value: etherToSpendForERC20,
    };

    return await TransactionHandler.signAndSendTransaction(txData, process.env.transactionMakerPrivateKey);
  },
};

module.exports = SwapETHForERC20;
