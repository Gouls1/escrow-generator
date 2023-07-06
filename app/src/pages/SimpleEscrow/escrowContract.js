import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './escrowDeploy';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function SimpleEscrow() {

    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();

    useEffect(() => {
    async function getAccounts() {
        const accounts = await provider.send('eth_requestAccounts', []);

        setAccount(accounts[0]);
        setSigner(provider.getSigner());
    }

    getAccounts();
    }, [account]);


    async function newContract() {
        const beneficiary = document.getElementById('beneficiary').value;
        const arbiter = document.getElementById('arbiter').value;
        const value = ethers.utils.parseEther(document.getElementById('ETH').value);
        const historyContractAddress = '0xD81267Ce7922fbaAd6D9ac4422B312D4516586FD';
        const escrowContract = await deploy(signer, historyContractAddress, arbiter, beneficiary, value);
    }

    return (
        <>
        <div className='page'>
            <h1> New Escrow Contract</h1>
            <div className="contract">
                <label>
                Third party address that will approve or decline the transfer of funds
                <input type="text" id="arbiter" />
                </label>

                <label>
                Beneficiary of the funds
                <input type="text" id="beneficiary" />
                </label>

                <label>
                Deposit Amount (in ETH)
                <input type="text" id="ETH" />
                </label>

                <div
                className="button"
                id="deploy"
                onClick={(e) => {
                    e.preventDefault();

                    newContract();
                }}
                >
                Deploy
                </div>
            </div>
        </div>
        </>
    );
}

export default SimpleEscrow;