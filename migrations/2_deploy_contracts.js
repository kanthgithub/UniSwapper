const lakshmiToken = artifacts.require('./LakshmiToken.sol')

module.exports = function (deployer, network, accounts) {
  deployer.then(async () => {
    const lakshmiTokenDeployedInstance = await deployer.deploy(lakshmiToken);
    console.log(`lakshmiToken is deployed with Address: ${lakshmiTokenDeployedInstance.address}`);
  });
};
