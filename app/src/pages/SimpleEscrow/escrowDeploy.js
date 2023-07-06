import { ethers } from 'ethers';
import Escrow from '../../artifacts/contracts/Escrow.sol/Escrow';

export default async function deploy(signer, contractAddress, arbiter, beneficiary, value) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );
  return factory.deploy(contractAddress, arbiter, beneficiary, { value });
}
