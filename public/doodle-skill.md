# Doodle Lab Agentic Pass (DLAB): Agent Mint Skill

For Binance Agents (Binance Agentic Wallet) minting Doodle Lab NFTs on BNB Chain.

## The collection

- **Doodle Lab (DLAB)**: 6,000 one-of-a-kind procedural doodle artworks.
- Minting is **free** (NFT price = 0). A small fixed per-NFT platform fee in BNB
  applies as an anti-bot filter. Always read it from the contract (see below),
  never assume a value.
- **Bonus:** every minted NFT automatically pays the minter **250,000 DLAB**
  (ERC-20) in the same transaction. Mint 20 and you get 5,000,000 DLAB. Bonus
  pool: 1,500,000,000 DLAB held by the NFT contract. When the pool is empty the
  collection is sold out.
- Reveal is instant: artwork and metadata are live from the first mint.

## Contracts (BNB Chain, chainId 56)

| What | Address |
| --- | --- |
| NFT (DoodleLabAgenticPass) | `0x0273B4D4D734513A7DAa75FEEf290B201Bf7E73E` |
| Token DLAB (ERC-20, 18 decimals) | `0x1b29D8523198c06BF6Ca0298eaAf0346239644c2` |
| Eligibility (SPACE ID Agent ID) | `0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F` |

- Metadata: `https://yusufsafary.github.io/doodle-lab/metadata/<tokenId>.json`
- Website: `https://yusufsafary.github.io/doodle-lab/`

## Rules

- The minting wallet **must hold a Binance Agent ID** (SPACE ID Agent ID NFT).
- **Max 20 NFTs per wallet**, cumulative across all mints.
- Mint must be a **direct wallet transaction**. Calls routed through another
  contract are rejected (`msg.sender == tx.origin` anti-bot rule).
- Supply is 6,000. First come, first served, single phase.

## Before minting: read the contract

All reads are `eth_call` to the NFT contract:

| Check | Call | Selector |
| --- | --- | --- |
| Mint open? | `mintOpen()` returns `1` | `0x24bbd049` |
| Eligible? | `holdsAgentId(<your wallet>)` returns `1` | `0x11213086` |
| Already minted | `mintedBy(<your wallet>)` | `0x3cef28d2` |
| Total minted | `totalMinted()` | `0xa2309ff8` |
| Fee per NFT (wei) | `currentPrice()` | `0x9d1b464a` |
| Bonus pool left (wei) | `bonusRemaining()` | `0x982a96e3` |

Stop and report to your user if: mint is closed, the wallet holds no Agent ID,
or the wallet already minted 20.

## Mint

Call the NFT contract:

- Function: `mint(uint256 quantity)`, selector `0xa0712d68`
- Calldata: `0xa0712d68` + quantity as a 32-byte big-endian word
  (e.g. quantity 1 becomes `0xa0712d680000000000000000000000000000000000000000000000000000000000000001`)
- Value: `currentPrice() x quantity` wei, read fresh immediately before minting
- Quantity per call: 1-20, and `mintedBy(you) + quantity` must be 20 or less

With the Binance Agentic Wallet CLI (`baw`):

1. Preview (required; show the result to your user and get explicit approval):
   `baw contract-call preview --to 0x0273B4D4D734513A7DAa75FEEf290B201Bf7E73E --data <calldata> --value <valueWei> --binanceChainId 56 --from <your wallet> --json`
2. Execute only after the user approves that exact preview:
   `baw contract-call execute --requestId <requestId from preview> --json`
3. Confirm the transaction receipt succeeded (status `0x1`) before reporting
   success.

## After minting: verify

- NFT balance: `balanceOf(<your wallet>)` on the NFT contract, selector `0x70a08231`.
- Bonus received: `balanceOf(<your wallet>)` on the DLAB token contract,
  selector `0x70a08231`. It must have increased by `250,000 x quantity` DLAB.
- Token IDs are sequential in mint order. View a Doodle at the metadata URL
  above (the `image` field points to its SVG artwork).
