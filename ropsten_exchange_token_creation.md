
# Create Token-Exchange-Contract in Uniswap V1

## Introduction:

 - Uniswap Factory contract has been deployed by Uniswap on Ropsten.
 - Its ABI and code can be found in the ./abi directory of this project


 - contract Addresses on Ropsten:

  - Uniswap Factory Contract on Ropsten:

```js
const ropsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351
```

  - Create a Token pair from etherscan:

```js
    https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351#writeContract
```

## Script to create new Exchange-Contract from Factory:

 - Run javaScript file: 

    ```sh
        node ./scripts/CreateUniswapTokenExchangeContract.js
    ```

