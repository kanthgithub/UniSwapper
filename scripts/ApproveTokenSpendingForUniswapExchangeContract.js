require('dotenv').config();
const uniswapExchangeContractAbi = require('../abi/exchange.json');
const TransactionHandler = require('../utils/TransactionHandler');

const ApproveTokenSpendingForUniswapExchangeContract = {
  approveTokenSpending: async () => {
    const contract = TransactionHandler.loadContract(
      uniswapExchangeContractAbi,
      process.env.exchangeContractAddress_LakshmiKanthToken
    );

    //100 lakshmiKanth Tokens to be approved for spending by exchangeContractAddress_LakshmiKanthToken
    const lakshmiKanthTokenQuantityForApproval = TransactionHandler.toHex(
      100 * 10 ** 18
    );

    const tx = contract.methods.approve(
      process.env.exchangeContractAddress_LakshmiKanthToken,
      lakshmiKanthTokenQuantityForApproval
    );

    const nonceNumber = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    // get the number of transactions sent so far so we can create a fresh nonce
    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(nonceNumber),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: process.env.lakshmiKanthTokenContractAddress,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = ApproveTokenSpendingForUniswapExchangeContract;
