<<<<<<< HEAD
- Install node modules with 'yarn install'

In '.env' file
- visit "https://api.rarible.org/registration" to get Rarible Api key

- Consider replacing "PINATA_API_KEY", and "PINATA_API_SECRET" with your own for production, it will work for now with mine.

- Sign up on Alchemy and create App on Polygon Mainnet and Mumbai testnet to get RPC URL for production, also works with mine for now.

- 'CERT_GATEWAY' is just for returning URL to minted NFT on Rarible for users.

- request body example
    body: JSON.stringify({
      caller: "twin-galaxy",
      private_key: "",
      rpc_url: "https://polygon-mainnet.g.alchemy.com/v2/iIetpubSvvmcYS69wAkV1IYg863_pJV0",
      environment: "prod", //testnet
      collection_id: "0x8E992978B4728578F6ACc80D206cAedaD339EA83",
      ipfs_uri: "ipfs://ipfs/QmULMxNXJA7akSAt2wsAQLeP2yRbnn5vxr1gdRcz5Jqh77",
      royalties: [
        {
          account: "ETHEREUM:0xfb1bD209465adEaEeA13E05Bd6AeD02C73dA23Bf",
          value: 1000, //10%
        },
        {
          account: "ETHEREUM:0x2B2bd8fc26cAa36739EfB5A315ebD47D855aBD78",
          value: 1500,
        }],
      price: "3.5",
      currency: {
        "@type": "ETH",
        "blockchain": "POLYGON"
      }, // MATIC
      list_time: 100000,
    })
=======
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
>>>>>>> 9ffd07068a96abb5c4d2965c8ff5307d9a16d07c
