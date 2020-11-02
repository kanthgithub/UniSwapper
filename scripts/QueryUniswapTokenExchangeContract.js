const uniswapExchangeFactoryAbi = require('../abi/factory.json');
const TransactionHandler = require('../utils/TransactionHandler');

const QueryUniswapTokenExchangeContract = {
  queryTokenExchangeContract: async (queryingAddress) => {
    const uniswapExchangeFactoryInstance = TransactionHandler.loadContract(
      uniswapExchangeFactoryAbi,
      process.env.uniswapExchangeFactoryAddress
    );
    return await uniswapExchangeFactoryInstance.methods
      .getExchange(process.env.lakshmiKanthTokenContractAddress)
      .call({from: queryingAddress});
  },
};

module.exports = QueryUniswapTokenExchangeContract;
