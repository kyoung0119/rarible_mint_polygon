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