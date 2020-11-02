const SwapETHForERC20Token = require('../scripts/SwapETHForERC20Token');

const argv = require('minimist')(process.argv.slice(), {
  string: ['ethForSpending'],
});

async function swapETHForERC20(ethForSpending) {
  return await SwapETHForERC20Token.swap(ethForSpending);
}

// Implement async callback to enable the script to be run by truffle or node.
async function Main(callback) {
  try {
    // Pull the parameters from process arguments. Specifying them like this lets tests add its own.
    console.log(`ethForSpending in command trigger : ${argv.ethForSpending}`);

    const transactionHash = await swapETHForERC20(argv.ethForSpending);
    console.log(`completed swapping ${argv.ethForSpending} ETH for ERC20 Script - in transaction: ${transactionHash}`);
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
Main.swapETHForERC20 = swapETHForERC20;
module.exports = Main;
