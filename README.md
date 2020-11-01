# UniSwapper

## Purpose:
Swap Token  Assets on Uniswap 

## Use case:

### Use Case-1 On Uniswap-V1:

- ERC20 / ERC20 Pairs: 
  - In the first version any token had to be paired with ETH.
  - To trade a token with another token, 
  - one had to first exchange the first token into ETH and then use that ETH to purchase the other token. 

#### Scenario-1:

1. I as a User have ETH in my Ropsten Wallet

2. I want to exchange ETH for DAI

3. I will approve ETH spending for DAI tokens on DAI-ETH exchange Contract

4. I swap ETH for DAI via DAI-Token-Exchange-Contract

#### Scenario-2:

1. I as a User have DAI in my Ropsten Wallet

2. I want to exchange DAI for MKR

3. I will approve ETH spending for DAI tokens on DAI-MKR exchange Contract

4. I swap DAI for MKR via DAI-MKR-Exchange-Contract

### Use Case-3:

1. I have my token named as LAKSHMI_KANTH_TOKEN

   Ropsten: https://ropsten.etherscan.io/address/0x832f1854532927a061790e8d1e432c66985eca29

2. User can mint LAKSHMI_TOKEN using their ETH

3. My Agenda is to enable users to easily:
   - swap ETH for LAKSHMI_TOKEN
   - swap LAKSHMI_TOKEN for LINK_TOKEN

4. Each Token Swap has an associated ExchangeContract. 
    i.e an exclusive contract for each Token pair

5. We will deploy an Exchange contract with pair: ETH & LAKSHMI

6. Exchange TokenContract can be used to swap ETH for LAKSHMI_TOKEN and vice-versa

7. We will showcase on how user can swap their LAKSHMI_TOKEN for a LINK_TOKEN


## Testnet 

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

  - Create a Token pair from etherscan:

  ```js
  https://ropsten.etherscan.io/address/0x9c83dCE8CA20E9aAF9D3efc003b2ea62aBC08351#writeContract
  ```



## How UniSwap works?

```
Uniswap is made up of a series of ETH-ERC20 exchange contracts.

There is exactly one exchange contract per ERC20 token.

If a token does not yet have an exchange it can be created by anyone using the Uniswap factory contract. 
The factory serves as a public registry and is used to look up all token and exchange addresses added to the system.

Each exchange holds reserves of both ETH and its associated ERC20 token. 
Anyone can become a liquidity provider on an exchange and contribute to its reserves. 
This is different than buying or selling; it requires depositing an equivalent value of both ETH and the relevant ERC20 token. Liquidity is pooled across all providers and an internal “pool token” (ERC20) is used to track each providers relative contribution.

Pool tokens are minted when liquidity is deposited into the system and can be burned at any time to withdraw a proportional share of the reserves.

Exchange contracts are automated market makers between an ETH-ERC20 pair. 

Traders can swap between the two in either direction by adding to the liquidity reserve of one and withdrawing from the reserve of the other. 

Since ETH is a common pair for all ERC20 exchanges, it can be used as an intermediary allowing direct ERC20-ERC20 trades in a single transaction. 

Users can specify a recipient address if they want to receive purchased tokens at a different address from the one used to make a transaction.
```

