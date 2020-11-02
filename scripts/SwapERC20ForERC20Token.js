const uniswapExchangeContractAbi = require('../abi/exchange.json');
const TransactionHandler = require('../utils/TransactionHandler');

const SwapERC20ForERC20 = {
  swap: async (
    maxLinkTokensForPurchase,
    maxLinkTokensForSale,
    maxEthForSpending,
    receivableERC20Address
  ) => {
    const contract = TransactionHandler.loadContract(
      uniswapExchangeContractAbi,
      process.env.uniSwapExchangeContractAddress
    );

    const DEADLINE = 1742680400; // deadline = w3.eth.getBlock(w3.eth.blockNumber).timestamp
    const max_linkTokens_For_Purchase = web3.utils.toWei(
      maxLinkTokensForPurchase,
      'Ether'
    ); // 10 link tokens '10'
    const max_linkTokens_Tokens_For_Sale = web3.utils.toWei(
      maxLinkTokensForSale,
      'Ether'
    ); //'50'
    const max_Eth_For_Spending = web3.utils.toWei(maxEthForSpending, 'Ether'); // 1 ETH //'1'

    const tx = contract.methods.tokenToTokenTransferOutput(
      max_linkTokens_For_Purchase,
      max_linkTokens_Tokens_For_Sale,
      max_Eth_For_Spending,
      DEADLINE,
      process.env.transactionMaker,
      receivableERC20Address
    );

    //function to send RawTransaction
    var txCount = await TransactionHandler.getNonce(
      process.env.transactionMaker
    );

    // construct the transaction data
    const txData = {
      nonce: TransactionHandler.toHex(txCount),
      gasLimit: TransactionHandler.toHex(6000000),
      gasPrice: TransactionHandler.toHex(10000000000), // 10 Gwei
      to: process.env.uniSwapExchangeContractAddress,
      from: process.env.transactionMaker,
      data: tx.encodeABI(),
    };

    return await TransactionHandler.signAndSendTransaction(
      txData,
      process.env.transactionMakerPrivateKey
    );
  },
};

module.exports = SwapERC20ForERC20;
