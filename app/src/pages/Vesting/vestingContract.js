import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import deploy from './vestingDeploy';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function claim(vestingContract, signer) {
    const approveTxn = await vestingContract.connect(signer).claim();
    await approveTxn.wait();
  }

function VestingContract() {

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
        const numberOfClaims = parseInt(document.getElementById('number-of-claims').value);
        //const vestingIntervals = parseInt(document.getElementById('vesting-intervals').value);
            //Not needed for now, hardcoded to weekly vesting
        const value = ethers.utils.parseEther(document.getElementById('ETH').value);
        const historyContract = "0xD81267Ce7922fbaAd6D9ac4422B312D4516586FD";
        const vestingContract = await deploy(historyContract, signer, beneficiary, numberOfClaims, value);
    
    }

    return (
        <>
        <div className='page'>
            <h1> New Vesting Contract</h1>
            <div className="contract">
                <label>
                Beneficiary Address
                <input type="text" id="beneficiary" />
                </label>

                <label>
                Number of weeks the vesting should be over
                <input type="text" id="number-of-claims" />
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

            {/* <div className="existing-contracts">
                <h1> Existing Contracts </h1>

                <div id="container">
                {vesters.map((vester) => {
                    return <Vester key={vester.address} {...vester} />;
                })}
                </div>
            </div> */}
            </div>
        </>
    );

}

export default VestingContract;