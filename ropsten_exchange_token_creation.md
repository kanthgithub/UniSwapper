
# Token-Exchange-Contract Interactions on Uniswap-V1

## Introduction:

### Uniswap V1:

 - Uniswap Factory contract has been deployed by Uniswap on Ropsten.
 - Its ABI and code can be found in the ./abi directory of this project
 - Uniswap Factory Contract on Ropsten:
    ```js
    const ropsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
    https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351
    ```

## Usecase Details & Execution Steps:

1. Create an Exchange-Contract for LakshmiKanth Token
2. Verify if the Exchange-Contract has-been created successfully by querying the Uniswap-Exchange-Factory Contract
3. Approve the Spending of LakshmiKanth Token for UniSwap Exchange-Contract of LakshmiKanth Token
4. Add Liquidity of LakshmiKanth Token and some ETH to the Exchange-Contract of LakshmiKanth Token
5. Buyer with a walletAddress will exchange ETH for LakshmiKanth Token
6. Buyer with LakshmiKanthToken Assets will exchange LakshmiKanth-Token for the Link Tokens
   - Uniswap-V1 will take LakshmiKanthToken for ETH, then it will communicate with Exchange-Contract of Link Token
   - Uniswap-V1 will then exchange ETH for LINK tokens

7. UniSwap-V1 has a 2 step process to exchange ERC20 (Token-A) <-> ERC20 (Token-B)

   i. Exchange ERC20 (Token-A) for ETH on Exchange-Token-Contract of Token-A
   ii. Exchange ETH for ERC20 (Token-B) on Exchange-Token-Contract of Token-B


 - This Usecase contains execution of 5 scripts in Sequence to simulate the 7 Steps mentioned above:

## Step-1: Script to create new Exchange-Contract from Factory:

 - Run javaScript file: 

```sh
    node ./scripts/CreateUniswapTokenExchangeContract.js
```

### Script Execution Log:

 - Ropsten Etherscan for Exchange-Contract creation:

```js
    https://ropsten.etherscan.io/tx/0xd61fde11f2555195efe003655fd3b543642fc45ff72f50b79ddd0091162c9dd8#eventlog
```

 - Uniswap Exchange Contract Address (LAKSHMI_KANTH_TOKEN):

   - LakshmiKanth Token Contract Address: 0x832f1854532927a061790e8d1e432c66985eca29
   - Uniswap Exchange Contract for LakshmiKanth-Token : 0x0da1e0d8ca4364f944bd98ac4d7760d574a12797

   - Etherscan for Exchange Contract: https://ropsten.etherscan.io/address/0x0da1e0d8ca4364f944bd98ac4d7760d574a12797

## Step-2: Verify if the Exchange-Contract has-been created by querying the Uniswap-Exchange-Factory Contract

 - Execute command to Query the ExchangeContract Address for LakshmiKanthToken
```sh
    node scripts/QueryUniswapTokenExchangeContract.js 
```

- Terminal Logs:

```
    output of  exchange-address-Query for LakshmiKanth token is: 0x0DA1e0d8ca4364F944bD98AC4D7760D574a12797
    Exchange Address for LakshmiKanth Token in previous Step is: 0x0da1e0d8ca4364f944bd98ac4d7760d574a12797
```

## Step-3: Approve the Spending of LakshmiKanth Token for UniSwap Exchange-Contract of LakshmiKanth Token

 - This is also considered as adding liquidity to Uniswap-Exchange-Contract

 ```sh
    node scripts/ApproveTokenSpendingForUniswapExchangeContract.js 
 ```

 - Terminal Log:

 ```
    sent 0x798d058e3bfa7f997e4946cbdea2e284e425c4dbcf583ecace48fb2b9de056aa
 ```

 - Etherscan:  https://ropsten.etherscan.io/tx/0x798d058e3bfa7f997e4946cbdea2e284e425c4dbcf583ecace48fb2b9de056aa#eventlog


## Step-4: Add Liquidity of LakshmiKanth Token and some ETH to the Exchange-Contract of LakshmiKanth Token

 - LakshmiKanthTokens as well as ETH will be added as Liquidity to the Exchange Token Contract

 ```sh
  node scripts/AddLiquidityToExchangeContract.js
 ```

 - Terminal Logs:

 ```
 sent 0x0ab34bb2e07369d6a38513f8a1f3664e761ae516acca13ab6f3ef903e45f199b
 ```

- Event Emitted from AddLiquidity Function Call:

    |#|	Name |	Type |	Data|
    |0|	min_liquidity|	uint256| 1 |
    |1|	max_tokens   |	uint256| 15000000000000000000|
    |2|	deadline     |	uint256| 1742680400|

minimum Liquidity: 1
maximum Tokens: 15 LakshmiKanth Tokens (15 * 1e18)
deadline: 1742680400

EtherScan: https://ropsten.etherscan.io/tx/0x0ab34bb2e07369d6a38513f8a1f3664e761ae516acca13ab6f3ef903e45f199b

EtherScan Logs: https://ropsten.etherscan.io/tx/0x0ab34bb2e07369d6a38513f8a1f3664e761ae516acca13ab6f3ef903e45f199b#eventlog


### Verify the Funding of Tokens to ExchangeContract

![Add Liquidity For LakshmiKanthToken To UniSwap-V1-Exchange-Contract](./images/Add_Liquidity_LakshmiKanth_To_UniSwap-V1-Exchange-Contract.png)




