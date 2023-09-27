<<<<<<< HEAD
// const pinataSDK = require('@pinata/sdk');
import pinataSDK from '@pinata/sdk';
const pinata = new pinataSDK('857302a10f44a96ae3be', '3a5685e316037d81fc35e7ed61b869a496af7db61012e9708f2c184956df6a7b');

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
=======
// const pinataSDK = require('@pinata/sdk');
import pinataSDK from '@pinata/sdk';
const pinata = new pinataSDK('857302a10f44a96ae3be', '3a5685e316037d81fc35e7ed61b869a496af7db61012e9708f2c184956df6a7b');

pinata.testAuthentication().then((result) => {
    //handle successful authentication here
    console.log(result);
}).catch((err) => {
    //handle error here
    console.log(err);
>>>>>>> 9ffd07068a96abb5c4d2965c8ff5307d9a16d07c
});