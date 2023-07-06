const ethers = require('ethers');
require('dotenv').config();

async function main() {

    const url = process.env.GOERLI_URL;

    //const localUrl = 'http://127.0.0.1:8545/';

    let artifacts = await hre.artifacts.readArtifact('History');

    const provider = new ethers.providers.JsonRpcProvider(url);

    let privateKey = process.env.PRIVATE_KEY;
    //let localPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
    let wallet = new ethers.Wallet(privateKey, provider);

    let arbiter = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    let beneficiary = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';

    let factory = new ethers.ContractFactory(artifacts.abi, artifacts.bytecode, wallet);
    let history = await factory.deploy();

    console.log("History deployed at address: ", history.address);

    await history.deployed();

    //let myHistory = await history.viewEscrow(wallet.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
        });