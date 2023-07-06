import React from 'react';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

function Home() {
    return(
        <div className='page'>
                <h2 className='explain'>
                    Welcome, this application will take you through the process of
                    setting up different types of escrow contracts.
                </h2>
                    <h3 className='contract-types'>
                        <p className='escrow-description'>
                         <a href={`/simple-escrow`} >Simple Escrow: </a>
                         <br></br> 
                         <br></br>
                            In this type of contract, funds are locked until a third
                            party address approve, or decline the transfer.
                            <br></br>  
                            <br></br>
                            Upon approval funds are transferred to the beneficiary, whilst
                            upon decline they are returned to the deployer of the contract.
                            <br></br>
                            <br></br>
                            Only the chosen third party address will be able to unlock the funds.
                        </p>
                        <p className='locker-description'>
                            <a href={`/locker`} >Balance lock: </a>
                            <br></br>
                            <br></br>
                            In this type of contracts, funds are locked until a certain amount
                            of time, chosen by the deployer, has passed.
                            <br></br>
                            <br></br>
                            No third party is needed, and only the chosen beneficiary will be 
                            able to withdraw the funds once the locking period is finished.
                        </p>
                        <p className='vesting-description'>
                            <a href={`/vesting`} >Vesting contract: </a>
                            <br></br>
                            <br></br>
                            In this type of contracts funds are released in increments over a
                            certain number of periods (at the moment weekly).
                            <br></br>
                            <br></br>
                            No third party is needed, and only the chosen beneficiary will be 
                            able to claim funds with each vesting period.
                        </p>
                    </h3>
                    
            
        </div>
    );
}

export default Home;