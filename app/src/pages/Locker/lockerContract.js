import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './lockerDeploy';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function Locker() {

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
        const lockTime = parseInt(document.getElementById('lock-time').value);
        const value = ethers.utils.parseEther(document.getElementById('ETH').value);
        const historyContract = "0xD81267Ce7922fbaAd6D9ac4422B312D4516586FD";
        const lockerContract = await deploy(historyContract, signer, beneficiary, lockTime, value);
    }

    return (
        <>
        <div className='page'>
            <h1> New Locker Contract</h1>
            <div className="contract">
                <label>
                Beneficiary Address
                <input type="text" id="beneficiary" />
                </label>

                <label>
                Length of time to lock in days
                <input type="text" id="lock-time" />
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

export default Locker;