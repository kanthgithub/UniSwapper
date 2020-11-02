const uniswapExchangeContractAbi = require('../abi/exchange.json');
const TransactionHandler = require('../utils/TransactionHandler');

const SwapETHForERC20 = {
  swap: async (etherToSpend) => {
    const contract = TransactionHandler.loadContract(
      uniswapExchangeContractAbi,
      process.env.exchangeContractAddress_LakshmiKanthToken
    );

    //100 lakshmiKanth Tokens to be approved for spending by exchangeContractAddress_LakshmiKanthToken
    const etherToSpendForERC20 = TransactionHandler.toHex(
      etherToSpend * 10 ** 16
    ); // 0.05 ETH

    console.log(
      `etherToSpendForERC20 In Hex: ${etherToSpendForERC20} - inEth: ${TransactionHandler.fromWei(
        etherToSpendForERC20
      )}`
    );

    // get the number of transactions sent so far so we can create a fresh nonce
    const nonceForTxn = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    const DEADLINE = 1742680400; // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp
    const tx = contract.methods.ethToTokenSwapInput(1, DEADLINE);

    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(nonceForTxn),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: process.env.exchangeContractAddress_LakshmiKanthToken,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
      value: etherToSpendForERC20,
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = SwapETHForERC20;
