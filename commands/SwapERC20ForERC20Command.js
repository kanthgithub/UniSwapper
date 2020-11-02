const SwapERC20ForERC20Token = require('../scripts/SwapERC20ForERC20Token');

const argv = require('minimist')(process.argv.slice(), {
  string: [
    'receivableERC20Address',
    'maxLinkTokensForPurchase',
    'maxLinkTokensForSale',
    'maxEthForSpending',
  ],
});

async function swapERC20ForERC20(
  receivableERC20Address,
  maxLinkTokensForPurchase,
  maxLinkTokensForSale,
  maxEthForSpending
) {
  return await SwapERC20ForERC20Token.swap(
    receivableERC20Address,
    maxLinkTokensForPurchase,
    maxLinkTokensForSale,
    maxEthForSpending
  );
}

// Implement async callback to enable the script to be run by truffle or node.
async function Main(callback) {
  try {
    // Pull the parameters from process arguments. Specifying them like this lets tests add its own.
    console.log(
      `receivableERC20Address in command trigger : ${argv.receivableERC20Address}`
    );
    console.log(
      `maxLinkTokensForPurchase in command trigger : ${argv.maxLinkTokensForPurchase}`
    );
    console.log(
      `maxLinkTokensForSale in command trigger : ${argv.maxLinkTokensForSale}`
    );
    console.log(
      `maxEthForSpending in command trigger : ${argv.maxEthForSpending}`
    );

    await swapERC20ForERC20(
      argv.receivableERC20Address,
      argv.maxLinkTokensForPurchase,
      argv.maxLinkTokensForSale,
      argv.maxEthForSpending
    );
    console.log(`completed spending ERC20 for another ERC20 token Script`);
  } catch (error) {
    console.error(error);
  }
  callback();
}

function nodeCallback(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else process.exit(0);
}

// If called directly by node, execute the Poll Function. This lets the script be run as a node process.
if (require.main === module) {
  Main(nodeCallback)
    .then(() => {})
    .catch(nodeCallback);
}

// Each function is then appended onto to the `Main` which is exported. This enables these function to be tested.
Main.swapERC20ForERC20 = swapERC20ForERC20;
module.exports = Main;
