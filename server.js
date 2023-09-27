<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import fs from 'fs'
import pinataSDK from '@pinata/sdk'
import FormData from "form-data"
import dotenv from "dotenv"

import Web3 from "web3"
import { createRaribleSdk } from "@rarible/sdk"
import { toCollectionId, toUnionAddress, toItemId } from "@rarible/types"
import { EthereumWallet } from "@rarible/sdk-wallet"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import HDWalletProvider from "@truffle/hdwallet-provider"
import { estimate } from "@rarible/estimate-middleware"
import pkg from "@rarible/utils"
const { toBn } = pkg

// import azure from 'azure-storage';
// var retryOperations = new azure.ExponentialRetryPolicyFilter();
// var blobService = azure.createBlobService().withFilter(retryOperations)

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

// metadata json
let nftMetaData = {
    "name": "twNFTname",
    "description": "twNFTdiscription",
    "image": "",
    "external_url": "" /* pointing to an external URL defining the asset — e.g., the creator's website. */,
    "animation_url": "" /* IPFS Hash just as image field, but it allows every type of multimedia files. Like mp3, mp4 etc */,
    // the below section is not needed.
    "attributes": [
        {
            "key": "test_key"/* Key name - This must be a string */,
            "trait_type": "test_trait_type"/* Trait name - This must be a string */,
            "value": "test_value"/* Key Value - This must be a string */
        }
    ]
}

updateNodeGlobalVars()

app.post('/mintNFTtoRarible', async (req, res) => {
    const params = req.body
    if (params.caller != "twin-galaxy")
        res.json({ error: "failed" })
    const rpc_url = params.rpc_url
    const privateKey = params.private_key
    const environment = params.environment
    const collection_id = params.collection_id
    const ipfsUri = params.ipfs_uri
    const nftPrice = params.price
    const currency = params.currency
    const royalties = params.royalties
    const availableTime = params.list_time

    // configure rpc provider
    const provider = new HDWalletProvider(privateKey, rpc_url)
    // create web3 object with estimate middleware for EIP1559 transactions
    const providerWithEstimateMiddleware = estimate(provider, { threshold: 1.1, estimation: rpc_url })
    const web3 = new Web3(providerWithEstimateMiddleware)
    const web3Ethereum = new Web3Ethereum({ web3 })
    const raribleSdkWallet = new EthereumWallet(web3Ethereum)
    // initialize RaribleSDK
    const sdk = createRaribleSdk(raribleSdkWallet, environment, {
        apiKey: process.env.RARIBLE_API_KEY
    })

    const collectionAddress = "POLYGON:" + collection_id
    // get NFT metadata json URI from IPFS
    // const ipfsUri = await getIpfsUri(nftMetaData)

    console.log("ipfsUri: ", ipfsUri)
    console.log("collectionid: ", toCollectionId(collectionAddress))

    // mint NFT
    const mintResponse = await sdk.nft.mint({
        collectionId: toCollectionId(collectionAddress),
        uri: ipfsUri,
        // royalties: [{
        //     account: toUnionAddress("POLYGON:0xfb1bD209465adEaEeA13E05Bd6AeD02C73dA23Bf"),
        //     value: royalties,
        // }], //optional
        royalties: royalties,
        creators: [], //optional
        lazyMint: false,
        supply: 1,
    })
    await mintResponse.transaction.wait()

    const tokenId = mintResponse.itemId;
    console.log("token id: ", tokenId)

    // list minted NFT on sale

    const orderId = await sdk.order.sell({
        itemId: toItemId(tokenId),
        amount: 1,
        price: nftPrice,
        currency: currency,
        expirationDate: new Date(Date.now() + availableTime * 1000)
    })

    // format url to minted NFT
    const sanitizedCertURL = process.env.CERT_GATEWAY + tokenId.replace("POLYGON:", "")
    console.log("sanitized: ", sanitizedCertURL)

    res.json({ cert_url: sanitizedCertURL })
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});


const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const ipfsGateway = 'https://ipfs.io/ipfs/'
const ipfsSanitzedGateway = 'ipfs://ipfs/'
// upload image and json, return ipfs uri to metadata json
async function getIpfsUri(metadata) {
    let MyCustomName = "twNFT"
    let MyFileName = "src/sample.png"
    const readableStreamForFile = fs.createReadStream(MyFileName);
    const options = {
        pinataMetadata: {
            name: MyCustomName,
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'cuatomValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //send result hash CID to create Metadata.
        console.log("image upload result: ", result)

        //setting metadata info
        metadata.image = ipfsGateway + result.IpfsHash;

        //this is the meta data that points to the PNG, pinning JSON to pinata.
        const body = metadata;
        console.log("metadata: ", metadata)

        const options = {
            pinataMetadata: {
                name: "metadata.json", //this will always be named metadata.json
                keyvalues: {
                    customKey: 'CryptoMetaData'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        return pinata.pinJSONToIPFS(body, options).then((result) => {
            // return IpfsHash for URI to mint NFT.                               
            console.log("json upload result: ", result)
            return ipfsSanitzedGateway + result.IpfsHash;
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

function updateNodeGlobalVars() {
    global.FormData = FormData;
    global.window = {
        fetch: fetch,
        dispatchEvent: () => { },
    };
    global.CustomEvent = function CustomEvent() {
        return
    }
=======
import express from 'express';
import cors from 'cors';
import fs from 'fs'
import pinataSDK from '@pinata/sdk'
import FormData from "form-data"
import dotenv from "dotenv"

import Web3 from "web3"
import { createRaribleSdk } from "@rarible/sdk"
import { toCollectionId, toItemId } from "@rarible/types"
import { EthereumWallet } from "@rarible/sdk-wallet"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import HDWalletProvider from "@truffle/hdwallet-provider"
import { estimate } from "@rarible/estimate-middleware"
import pkg from "@rarible/utils"
const { toBn } = pkg

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
// metadata json
let nftMetaData = {
    "name": "twNFTname",
    "description": "twNFTdiscription",
    "image": "",
    "external_url": "" /* pointing to an external URL defining the asset — e.g., the creator's website. */,
    "animation_url": "" /* IPFS Hash just as image field, but it allows every type of multimedia files. Like mp3, mp4 etc */,
    // the below section is not needed.
    "attributes": [
        {
            "key": "test_key"/* Key name - This must be a string */,
            "trait_type": "test_trait_type"/* Trait name - This must be a string */,
            "value": "test_value"/* Key Value - This must be a string */
        }
    ]
}

updateNodeGlobalVars()

app.get('/mintNFTtoRarible', async (req, res) => {

    const rpc_url = process.env.RPC_URL
    const privateKey = process.env.PRIVATE_KEY

    // configure rpc provider
    const provider = new HDWalletProvider(privateKey, rpc_url)
    // create web3 object with estimate middleware for EIP1559 transactions
    const providerWithEstimateMiddleware = estimate(provider, { threshold: 1.1, estimation: rpc_url })
    const web3 = new Web3(providerWithEstimateMiddleware)
    const web3Ethereum = new Web3Ethereum({ web3 })
    const raribleSdkWallet = new EthereumWallet(web3Ethereum)
    // initialize RaribleSDK
    const sdk = createRaribleSdk(raribleSdkWallet, process.env.ENVIRONMENT)

    const collectionAddress = "POLYGON:" + process.env.COLLECTION_ID
    // get NFT metadata json URI from IPFS
    const ipfsUri = await getIpfsUri(nftMetaData)

    console.log("ipfsUri: ", ipfsUri)
    console.log("collectionid: ", toCollectionId(collectionAddress))

    // mint NFT
    const mintResponse = await sdk.nft.mint({
        collectionId: toCollectionId(collectionAddress),
        uri: ipfsUri,
        royalties: [], //optional
        creators: [], //optional
        lazyMint: false,
        supply: 1,
    })
    await mintResponse.transaction.wait()

    const tokenId = mintResponse.itemId;
    console.log("token id: ", tokenId)

    // list minted NFT on sale
    const nftPrice = "2.5"
    const availableTime = 1000000 // seconds

    const orderId = await sdk.order.sell({
        itemId: toItemId(tokenId),
        amount: 1,
        price: nftPrice,
        currency: {
            "@type": "ETH",
            "blockchain": "POLYGON"
        },
        expirationDate: new Date(Date.now() + availableTime * 1000)
    })

    // format url to minted NFT
    const sanitizedCertURL = process.env.CERT_GATEWAY + tokenId.replace("POLYGON:", "")
    console.log("sanitized: ", sanitizedCertURL)

    res.json({ cert_url: sanitizedCertURL })
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});


const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET);

const ipfsGateway = 'https://ipfs.io/ipfs/'
const ipfsSanitzedGateway = 'ipfs://ipfs/'
// upload image and json, return ipfs uri to metadata json
async function getIpfsUri(metadata) {
    let MyCustomName = "twNFT"
    let MyFileName = "src/sample.png"
    const readableStreamForFile = fs.createReadStream(MyFileName);
    const options = {
        pinataMetadata: {
            name: MyCustomName,
            keyvalues: {
                customKey: 'customValue',
                customKey2: 'cuatomValue2'
            }
        },
        pinataOptions: {
            cidVersion: 0
        }
    };
    return pinata.pinFileToIPFS(readableStreamForFile, options).then((result) => {
        //send result hash CID to create Metadata.
        console.log("image upload result: ", result)

        //setting metadata info
        metadata.image = ipfsGateway + result.IpfsHash;

        //this is the meta data that points to the PNG, pinning JSON to pinata.
        const body = metadata;
        console.log("metadata: ", metadata)

        const options = {
            pinataMetadata: {
                name: "metadata.json", //this will always be named metadata.json
                keyvalues: {
                    customKey: 'CryptoMetaData'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };
        return pinata.pinJSONToIPFS(body, options).then((result) => {
            // return IpfsHash for URI to mint NFT.                               
            console.log("json upload result: ", result)
            return ipfsSanitzedGateway + result.IpfsHash;
        }).catch((err) => {
            //handle error here
            console.log(err);
        });
    }).catch((err) => {
        //handle error here
        console.log(err);
    });
}

function updateNodeGlobalVars() {
    global.FormData = FormData;
    global.window = {
        fetch: fetch,
        dispatchEvent: () => { },
    };
    global.CustomEvent = function CustomEvent() {
        return
    }
>>>>>>> 9ffd07068a96abb5c4d2965c8ff5307d9a16d07c
}