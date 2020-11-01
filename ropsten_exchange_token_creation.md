
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
2. Verify if the UniSwap-Exchange-Contract_LakshmiKanth_Token has-been created successfully by querying the Uniswap-Exchange-Factory Contract
3. Approve the Spending of LakshmiKanth Token for UniSwap-Exchange-Contract_LakshmiKanth_Token
4. Add Liquidity of LakshmiKanth Token and some ETH to the UniSwap-Exchange-Contract_LakshmiKanth_Token
5. Buyer with a walletAddress will exchange ETH for LakshmiKanth Token
6. Buyer with LakshmiKanthToken Assets will exchange LakshmiKanth-Token for the Link Tokens
   - Buyer will allow approval of spending of Lakshmikanth-Token to UniSwap-Exchange-Contract_LakshmiKanth_Token
   - Uniswap-V1 will exchange LakshmiKanthToken for ETH, then it will communicate with Exchange-Contract of Link Token
   - Uniswap-V1 will then exchange ETH for LINK tokens

   - UniSwap-V1 has a 2 step process to exchange ERC20 (Token-A) <-> ERC20 (Token-B)

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

## Step-5: Buyer with a walletAddress will exchange ETH for LakshmiKanth Token

- Command to execute:

```sh
 node scripts/SwapETHForERC20Token.js 
```

- terminal Logs:

```
etherToSpendForERC20: 0xb1a2bc2ec50000 - inEth: 0.05
sent 0x36d2688d61d8137329b5bfb73ac5dcb6cc4e443462507026903ef2021ffaf40e
```

- Etherscan Proofs:

 - transactionHash: 0x36d2688d61d8137329b5bfb73ac5dcb6cc4e443462507026903ef2021ffaf40e
 - Etherscan Link: https://ropsten.etherscan.io/tx/0x36d2688d61d8137329b5bfb73ac5dcb6cc4e443462507026903ef2021ffaf40e
 - InputData for function from EtherscaN:

 ```
 Function: ethToTokenSwapInput(uint256 min_tokens, uint256 deadline) ***

    MethodID: 0xf39b5b9b
    [0]:  0000000000000000000000000000000000000000000000000000000000000001
    [1]:  0000000000000000000000000000000000000000000000000000000067df3150
 ``` 


 ### Verify the Token transfer transaction on Etherscan (Tonken Tracker: Uniswap V1)

![UniSwap_Swap_ETH_For_ERC20_Token](./images/UniSwap_Swap_ETH_For_ERC20_Token.png)
 

## Step-6: Buyer with LakshmiKanthToken Assets will exchange LakshmiKanth-Token for the Link Tokens

 - Run command to swap ERC20 Tokens

 ```sh
    node scripts/SwapERC20ForERC20Token.js 
 ```

 - Terminal Logs:
 ```
 sent 0xbf44f4d342a9e3ba1ce38f7841dc22b94273bff4f866750fc95b036c6b31b5db
 ```

- Etherscan Proofs:

  - transactionHash: 0xbf44f4d342a9e3ba1ce38f7841dc22b94273bff4f866750fc95b036c6b31b5db
  - Etherscan URL: 





