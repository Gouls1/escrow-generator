import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import AbiHistory from '../../artifacts/contracts/History.sol/History';
import AbiLocker from '../../artifacts/contracts/TokenLock.sol/TokenLock';
import AbiVester from '../../artifacts/contracts/Vested.sol/Vesting';
import AbiEscrow from '../../artifacts/contracts/Escrow.sol/Escrow';

import Escrow from '../SimpleEscrow/escrowHistory';
import Timelocker from '../Locker/lockerHistory';
import Vester from '../Vesting/vestingHistory';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const historyContractAddress = '0xD81267Ce7922fbaAd6D9ac4422B312D4516586FD';

export async function approve(escrowContract, signer) {
    const approveTxn = await escrowContract.connect(signer).approve();
    await approveTxn.wait();
  }
export async function cancel(escrowContract, signer) {
      const approveTxn = await escrowContract.connect(signer).cancel();
      await approveTxn.wait();
  }
export async function claim(lockerContract, signer) {
    const approveTxn = await lockerContract.connect(signer).claim();
    await approveTxn.wait();
  }
export async function vestingClaim(vestingContract, signer) {
    const approveTxn = await vestingContract.connect(signer).claim();
    await approveTxn.wait();
  }

function History() {
    const [account, setAccount] = useState();

    const [contractHistory, setEsContractHistory] = useState([]);
    const [arbiterHistory, setEsArbiterHistory] = useState([]);
    const [beneficiaryHistory, setEsBeneficiaryHistory] = useState([]);

    const [lockerDeployer, setLockerDeployer] = useState([]);
    const [lockerBeneficiary, setLockerBeneficiary] = useState([]);

    const [vesterDeployer, setVesterDeployer] = useState([]);
    const [vesterBeneficiary, setVesterBeneficiary] = useState([]);

    useEffect(() => {
        async function getAccounts() {
            const accounts = await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();

            //Create an instance of the History contract
            const historyContract = new ethers.Contract(historyContractAddress, AbiHistory.abi, signer);

 //============================= HISTORY OF SIMPLE ESCROW CONTRACT =============================================
            
            const escrowAsDeployer = await historyContract.viewEscrow(accounts[0]);

            const escrowAsArbiter = await historyContract.viewAsArbiter(accounts[0]);

            const escrowAsBeneficiary = await historyContract.viewAsBeneficiary(accounts[0]);

            //first extract required items from asDeployer into an array of an array, then transform the sub-array into an object
            //and finally add he finctions handleApprove and handleCancle into the object.  Final result is an array of objects
            const historyAsDeployer = escrowAsDeployer.map(item => [
                                                    item.contractAddress,
                                                    item.arbiter,
                                                    item.beneficiary,
                                                    ethers.utils.formatEther(item.value.toString()),
                                                    item.typeOf
                                                  ])
                                          .map(([address, arbiter, beneficiary, value, typeOf]) => ({ address, arbiter, beneficiary, value, typeOf }))
                                          .map(item => ({...item,
                                                        role: "Deployer",
                                                        }));
            const historyAsArbiter = escrowAsArbiter.map(item => [
                                                  item.contractAddress,
                                                  item.arbiter,
                                                  item.beneficiary,
                                                  ethers.utils.formatEther(item.value.toString()),
                                                  item.typeOf
                                                ])
                                              .map(([address, arbiter, beneficiary, value, typeOf]) => ({ address, arbiter, beneficiary, value, typeOf }))
                                              .map(item => ({...item,
                                                            role: "Arbiter", 
                                                            handleApprove: async function() {
                                                                              const escrowContract = new ethers.Contract(item.address, AbiEscrow.abi,signer);
                                                                              escrowContract.on('Approved', () => {
                                                                                document.getElementById(escrowContract.address).className = 'complete';
                                                                                document.getElementById(escrowContract.address).innerText = "✓ It's been approved!";
                                                                              });
                                                                              await approve(escrowContract, signer);
                                                                          },
                                                            handleCancel: async function() {
                                                                              const escrowContract = new ethers.Contract(item.address, AbiEscrow.abi,signer);
                                                                              escrowContract.on('Cancelled', () => {
                                                                                document.getElementById(escrowContract.address).className = 'cancelled';
                                                                                document.getElementById(escrowContract.address).innerText = "X It's been cancelled!";
                                                                              });
                                                                              await cancel(escrowContract, signer);
                                                                          }
                                                            }));
            const historyAsBeneficiary = escrowAsBeneficiary.map(item => [
                                                    item.contractAddress,
                                                    item.arbiter,
                                                    item.beneficiary,
                                                    ethers.utils.formatEther(item.value.toString()),
                                                    item.typeOf
                                                  ])
                                                .map(([address, arbiter, beneficiary, value, typeOf]) => ({ address, arbiter, beneficiary, value, typeOf }))
                                                .map(item => ({...item,
                                                              role: "Beneficiary",
                                                              }));

//================================== HISTORY OF LOCKER CONTRACT ===================================================================
               
            const lockerAsDeployer = await historyContract.viewLockerAsDeployer(accounts[0]);

            const lockerAsBeneficiary = await historyContract.viewLockerAsBeneficiary(accounts[0]);

            const historyLockerAsDeployer = lockerAsDeployer.map(item => [
                                                            item.contractAddress,
                                                            item.beneficiary,
                                                            ethers.utils.formatEther(item.value.toString()),
                                                            item.typeOf,
                                                            parseInt(item.lockPeriod).toString()
                                                          ])
                                                      .map(([address, beneficiary, value, typeOf, lockPeriod]) => ({ address, beneficiary, value, typeOf, lockPeriod }))
                                                      .map(item => ({...item,
                                                                    role: "Deployer",
                                                                    }));

            const historyLockerAsBeneficiary = lockerAsBeneficiary.map(item => [
                                                                        item.contractAddress,
                                                                        item.beneficiary,
                                                                        ethers.utils.formatEther(item.value.toString()),
                                                                        item.typeOf,
                                                                        item.lockPeriod.toNumber()
                                                                      ])
                                                                  .map(([address, beneficiary, value, typeOf, lockPeriod ]) => ({ address, beneficiary, value, typeOf, lockPeriod }))
                                                                  .map(item => ({...item,
                                                                                role: "Beneficiary",
                                                                                handleClaim: async function() {
                                                                                                const lockerContract = new ethers.Contract(item.address, AbiLocker.abi,signer);
                                                                                                lockerContract.on('Claimed', () => {
                                                                                                  document.getElementById(lockerContract.address).className = 'claimed';
                                                                                                  document.getElementById(lockerContract.address).innerText = "✓ It's been claimed!";
                                                                                                });
                                                                                                await claim(lockerContract, signer);
                                                                                            }
                                                                                }));

//================================== HISTORY OF VESTING CONTRACT ===================================================================

            const vesterAsDeployer = await historyContract.viewVesterAsDeployer(accounts[0]);

            const vesterAsBeneficiary = await historyContract.viewVesterAsBeneficiary(accounts[0]);

            const historyVesterAsDeployer = vesterAsDeployer.map(item => [
                                                                  item.contractAddress,
                                                                  item.beneficiary,
                                                                  ethers.utils.formatEther(item.value.toString()),
                                                                  item.typeOf,
                                                                  parseInt(item.numberOfClaims).toString()
                                                                ])
                                                            .map(([address, beneficiary, value, typeOf, numberOfClaims]) => ({ address, beneficiary, value, typeOf, numberOfClaims }))
                                                            .map(item => ({...item,
                                                                          role: "Deployer",
                                                                          }));

            const historyVesterAsBeneficiary = vesterAsBeneficiary.map(item => [
                                                                        item.contractAddress,
                                                                        item.beneficiary,
                                                                        ethers.utils.formatEther(item.value.toString()),
                                                                        item.typeOf,
                                                                        item.numberOfClaims.toNumber()
                                                                      ])
                                                                  .map(([address, beneficiary, value, typeOf, numberOfClaims ]) => ({ address, beneficiary, value, typeOf, numberOfClaims }))
                                                                  .map(item => ({...item,
                                                                                role: "Beneficiary",
                                                                                handleClaim: async function() {
                                                                                                const vesterContract = new ethers.Contract(item.address, AbiVester.abi,signer);
                                                                                                vesterContract.on('Claimed', () => {
                                                                                                  document.getElementById(vesterContract.address).className = 'claimed';
                                                                                                  document.getElementById(vesterContract.address).innerText = "✓ It's been claimed!";
                                                                                                });
                                                                                                await vestingClaim(vesterContract, signer);
                                                                                            }
                                                                                }));

            setAccount(accounts[0]);

            setEsContractHistory(historyAsDeployer);
            setEsArbiterHistory(historyAsArbiter);
            setEsBeneficiaryHistory(historyAsBeneficiary)

            setLockerDeployer(historyLockerAsDeployer);
            setLockerBeneficiary(historyLockerAsBeneficiary);

            setVesterDeployer(historyVesterAsDeployer);
            setVesterBeneficiary(historyVesterAsBeneficiary);
        }
    
        getAccounts();
        }, [account]);

     if(contractHistory.length == 0 && arbiterHistory.length ==0 && beneficiaryHistory.length == 0
          && lockerDeployer.length == 0 && lockerBeneficiary == 0) {
        return(
            <div className='page'>
                <h1> History </h1>
                <h2> Nothing to display </h2>
            </div>
        )
      } else{
        return(
            <div className='page'>
                <h1> History </h1>
                <div className="existing-contracts">
                    <div id="container">
                        {contractHistory.map((contract) => {
                            return <Escrow key={contract.address} {...contract} />
                        })}
                        {arbiterHistory.map((contract) => {
                            return <Escrow key={contract.address} {...contract} />
                        })}
                        {beneficiaryHistory.map((contract) => {
                            return <Escrow key={contract.address} {...contract} />
                        })}
                        {lockerDeployer.map((contract) => {
                            return <Timelocker key={contract.address} {...contract} />
                        })}
                        {lockerBeneficiary.map((contract) => {
                            return <Timelocker key={contract.address} {...contract} />
                        })}
                        {vesterDeployer.map((contract) => {
                            return <Vester key={contract.address} {...contract} />
                        })}
                        {vesterBeneficiary.map((contract) => {
                            return <Vester key={contract.address} {...contract} />
                        })}
                        
                    </div>
                </div>
            </div>
        )
      }
}

export default History;