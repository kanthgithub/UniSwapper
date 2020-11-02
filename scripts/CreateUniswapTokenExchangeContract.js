// create a new Uniswap Exchange contract via Uniswap Factory contract - createExchange
const uniswapExchangeFactoryAbi = require('../abi/factory.json');
const TransactionHandler = require('../utils/TransactionHandler');

const CreateUniswapTokenExchangeContract = {
  createTokenExchange: async () => {
    const contract = TransactionHandler.loadContract(
      uniswapExchangeFactoryAbi,
      process.env.uniswapExchangeFactoryAddress
    );

    const tx = contract.methods.createExchange(
      process.env.lakshmiKanthTokenContractAddress
    );

    //function to send RawTransaction
    var txCount = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    console.log(`transactionCount to be used as nonce: ` + txCount);

    var txData = {
      nonce: TransactionHandler.toHex(txCount),
      gasLimit: TransactionHandler.toHex(8000000),
      gasPrice: TransactionHandler.toHex(10000000000),
      to: process.env.uniswapExchangeFactoryAddress,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = CreateUniswapTokenExchangeContract;
