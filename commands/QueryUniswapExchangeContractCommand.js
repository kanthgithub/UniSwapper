const QueryUniswapTokenExchangeContract = require('../scripts/QueryUniswapTokenExchangeContract');

const argv = require("minimist")(process.argv.slice(), {
  string: ["tokenAddress"]
});

async function queryUniswapTokenExchange(){
  return await QueryUniswapTokenExchangeContract.queryTokenExchangeContract('0x0e364eb0ad6eb5a4fc30fc3d2c2ae8ebe75f245c');
}

// Implement async callback to enable the script to be run by truffle or node.
async function Main(callback) {

try {
    // Pull the parameters from process arguments. Specifying them like this lets tests add its own.
    const data = await queryUniswapTokenExchange();
    console.log(`exchangeAddress: ${data}`);
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
Main.queryUniswapTokenExchange = queryUniswapTokenExchange;
module.exports = Main;
