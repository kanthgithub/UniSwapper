const uniswapExchangeContractAbi = require('../abi/exchange.json');
const TransactionHandler = require('../utils/TransactionHandler');

const AddLiquidityToExchangeContract = {
  addLiquidity: async (liquidity) => {
    //100 lakshmiKanth Tokens to be approved for spending by exchangeContractAddress_LakshmiKanthToken
    const etherFunding = TransactionHandler.toHex(1 * 10 ** 17); // 0.1 ETH

    const lakshmiKanthTokenQuantityForLiquidity = TransactionHandler.toHex(
      liquidity * 10 ** 18
    ); // 15  tokens

    const DEADLINE = 1742680400; // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp

    const contract = TransactionHandler.loadContract(
      uniswapExchangeContractAbi,
      process.env.exchangeContractAddress_LakshmiKanthToken
    );

    const tx = contract.methods.addLiquidity(
      1,
      lakshmiKanthTokenQuantityForLiquidity,
      DEADLINE
    );

    const nonce = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(nonce),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: process.env.exchangeContractAddress_LakshmiKanthToken,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
      value: etherFunding,
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = AddLiquidityToExchangeContract;
