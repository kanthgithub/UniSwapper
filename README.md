# UniSwapper

## Purpose:
Swap Token  Assets on Uniswap 

## Use case:

1. I have my token named as LAKSHMI_TOKEN

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

```js
const OWNER = '0x1c4411c670Ef6c3B1009B5D13C3822b977b52ce1';
const OWNER_PRIVATE_KEY = '7b686b07e74fb5669b45a3eedb03b7af7ca69763b2a1a941815d210f3e1b5729';
```

  - As this is only tesnet, i am providing keys here
  - PLEASE DONT SHARE any mainnet Keys


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

