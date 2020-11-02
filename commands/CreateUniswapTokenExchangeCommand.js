const CreateUniswapTokenExchangeContract = require('../scripts/CreateUniswapTokenExchangeContract');

const argv = require("minimist")(process.argv.slice(), {
  string: ["tokenAddress"]
});

async function createTokenExchange(){
  return await CreateUniswapTokenExchangeContract.createTokenExchange();
}

// Implement async callback to enable the script to be run by truffle or node.
async function Main(callback) {

try {
    // Pull the parameters from process arguments. Specifying them like this lets tests add its own.
    await createTokenExchange();
    console.log(`completed approve token Spending Script`);
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
Main.createTokenExchange = createTokenExchange;
module.exports = Main;
