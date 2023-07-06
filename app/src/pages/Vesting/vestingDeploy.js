import { ethers } from 'ethers';
import Vester from '../../artifacts/contracts/Vested.sol/Vesting';

export default async function deploy(historyContract, signer, beneficiary, numberOfClaims, value) {
  const factory = new ethers.ContractFactory(
    Vester.abi,
    Vester.bytecode,
    signer
  );
  return factory.deploy(historyContract, beneficiary, numberOfClaims, { value });
}
