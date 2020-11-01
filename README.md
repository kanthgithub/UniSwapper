# UniSwapper

## Purpose:

Swap Token Assets on Uniswap 
-----
## How UniSwap works?
```
Uniswap is made up of a series of ETH-ERC20 exchange contracts.

There is exactly one exchange contract per ERC20 token.

If a token does not yet have an exchange it can be created by 
anyone using the Uniswap factory contract. 

The factory serves as a public registry and is used to look up all token
and exchange addresses added to the system.

Each exchange holds reserves of both ETH and its associated ERC20 token. 
Anyone can become a liquidity provider on an exchange and contribute to its reserves. 

This is different than buying or selling; it requires depositing
an equivalent value of both ETH and the relevant ERC20 token. 

Liquidity is pooled across all providers and an internal “pool token” (ERC20) 
is used to track each providers relative contribution.

Pool tokens are minted when liquidity is deposited into the system and 
can be burned at any time to withdraw a proportional share of the reserves.

Exchange contracts are automated market makers between an ETH-ERC20 pair. 

Traders can swap between the two in either direction by adding to the
liquidity reserve of one and withdrawing from the reserve of the other. 

Since ETH is a common pair for all ERC20 exchanges, it can be used as an 
intermediary allowing direct ERC20-ERC20 trades in a single transaction. 

Users can specify a recipient address if they want to receive purchased tokens 
at a different address from the one used to make a transaction.
```
-----
## Use case:
-----

1. I have my token named as LAKSHMI_KANTH_TOKEN

   Ropsten: 
   https://ropsten.etherscan.io/address/0x832f1854532927a061790e8d1e432c66985eca29

2. User can mint LAKSHMI_TOKEN using their ETH

3. My Agenda is to enable users to easily:
   - swap ETH for LAKSHMI_TOKEN
   - swap LAKSHMI_TOKEN for LINK_TOKEN

4. Each Token Swap has an associated ExchangeContract. 
    i.e an exclusive contract for each Token pair

5. We will deploy an Exchange contract with pair: ETH & LAKSHMI

6. Exchange TokenContract can be used to swap ETH for LAKSHMI_TOKEN and vice-versa

7. We will showcase on how user can swap their LAKSHMI_TOKEN for a LINK_TOKEN

-----
## Testnet 
-----

 - We will be using Ropsten testnet for deployment of Token and Exchange Contracts
 - Deployer address and privateKey are provided here. 
   - As this is only tesnet, i am providing keys here
   - PLEASE DONT SHARE any mainnet Keys

```js
const OWNER = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const OWNER_PRIVATE_KEY = '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';
```

 - contract Addresses on Ropsten:

  - Uniswap Factory Contract on Ropsten:

  ```js
    const ropsten = '0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351'
    https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351
  ```

-----
## Usecase Details & Execution Steps:
-----

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

-----
### Step-1: Script to create new Exchange-Contract from Factory:
-----

 - Run javaScript file: 

```sh
    node ./scripts/CreateUniswapTokenExchangeContract.js
```

#### Script Execution Log:

 - Ropsten Etherscan for Exchange-Contract creation:

```js
    https://ropsten.etherscan.io/tx/0xd61fde11f2555195efe003655fd3b543642fc45ff72f50b79ddd0091162c9dd8#eventlog
```

 - Uniswap Exchange Contract Address (LAKSHMI_KANTH_TOKEN):

   - LakshmiKanth Token Contract Address: 0x832f1854532927a061790e8d1e432c66985eca29
   - Uniswap Exchange Contract for LakshmiKanth-Token : 0x0da1e0d8ca4364f944bd98ac4d7760d574a12797

   - Etherscan for Exchange Contract: https://ropsten.etherscan.io/address/0x0da1e0d8ca4364f944bd98ac4d7760d574a12797

-----
### Step-2: Verify if the Exchange-Contract has-been created by querying the Uniswap-Exchange-Factory Contract
-----

 - Execute command to Query the ExchangeContract Address for LakshmiKanthToken
```sh
    node scripts/QueryUniswapTokenExchangeContract.js 
```

- Terminal Logs:

```
    output of  exchange-address-Query for LakshmiKanth token is: 0x0DA1e0d8ca4364F944bD98AC4D7760D574a12797
    Exchange Address for LakshmiKanth Token in previous Step is: 0x0da1e0d8ca4364f944bd98ac4d7760d574a12797
```

-----
### Step-3: Approve the Spending of LakshmiKanth Token for UniSwap Exchange-Contract of LakshmiKanth Token
-----

 - This is also considered as adding liquidity to Uniswap-Exchange-Contract

 ```sh
    node scripts/ApproveTokenSpendingForUniswapExchangeContract.js 
 ```

 - Terminal Log:

 ```
    sent 0x798d058e3bfa7f997e4946cbdea2e284e425c4dbcf583ecace48fb2b9de056aa
 ```

 - Etherscan:  https://ropsten.etherscan.io/tx/0x798d058e3bfa7f997e4946cbdea2e284e425c4dbcf583ecace48fb2b9de056aa#eventlog

-----
### Step-4: Add Liquidity of LakshmiKanth Token and some ETH to the Exchange-Contract of LakshmiKanth Token
-----


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


#### Verify the Funding of Tokens to ExchangeContract

![Add Liquidity For LakshmiKanthToken To UniSwap-V1-Exchange-Contract](./images/Add_Liquidity_LakshmiKanth_To_UniSwap-V1-Exchange-Contract.png)

-----
## Step-5: Buyer with a walletAddress will exchange ETH for LakshmiKanth Token
-----

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


 #### Verify the Token transfer transaction on Etherscan (Tonken Tracker: Uniswap V1)

![UniSwap_Swap_ETH_For_ERC20_Token](./images/UniSwap_Swap_ETH_For_ERC20_Token.png)
 
-----
### Step-6: Buyer with LakshmiKanthToken Assets will exchange LakshmiKanth-Token for the Link Tokens
-----

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






