let fs = require('fs');
let Web3 = require('web3');
const uniswapExchangeFactoryAbi = require('../abi/factory.json');

//LakshmiKanthToken Contract Address
const lakshmiKanthTokenContractAddress = '0x832f1854532927A061790E8d1E432C66985ecA29';
var uniswapExchangeFactoryAddress = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351';
const queryingAddress = '0x0e364eb0ad6eb5a4fc30fc3d2c2ae8ebe75f245c';

let web3 = new Web3(
  new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/e16ecf41380f442987d31e736990fed2'
  )
);

const uniswapExchangeFactoryInstance = new web3.eth.Contract(uniswapExchangeFactoryAbi, uniswapExchangeFactoryAddress);

async function call(transaction) {
  return await transaction.call({from: queryingAddress});
}

async function getTokenExchangeAddress() {
  let lakshmiKanthExchangeAddress = 
    await call(uniswapExchangeFactoryInstance.methods.getExchange(lakshmiKanthTokenContractAddress));
  console.log('output of  exchange-address-Query for LakshmiKanth token is: ' + lakshmiKanthExchangeAddress);
  console.log('Exchange Address for LakshmiKanth Token in previous Step is: '+'0x0da1e0d8ca4364f944bd98ac4d7760d574a12797')
}

getTokenExchangeAddress();