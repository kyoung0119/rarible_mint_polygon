- Install node modules with 'yarn install'

In '.env' file
- Fill in "PRIVATE_KEY" with company wallet private key, will be used to pay for fees for minting and putting NFTs on sale

- Replace "COLLECTION_ID" with the id of the collection created on Rarible for NFTs, minted NFTs will be added here.

- Consider replacing "PINATA_API_KEY", and "PINATA_API_SECRET" with your own for production, it will work for now with mine.

- Sign up on Alchemy and create App on Polygon Mainnet and Mumbai testnet to get RPC URL for production, also works with mine for now.

- 'CERT_GATEWAY' is just used for returning URL to minted NFT on Rarible for users. you will see.

- 'ENVIRONMENT' is used for initialiing RaribleSDK, switch to 'prod' for production.

In 'server.js'
- Customize NFT metadata json as required.
- Customize NFT price and available sale period

- function getIpfsUri() is uploading static Image(src/sample.png) and metadata json to ipfs and returns ipfs uri, you will want to replace this with your down.

- I commented 'console.log()'s used for logging, you can remove them when it's not needed.# rarible_mint_polygon
