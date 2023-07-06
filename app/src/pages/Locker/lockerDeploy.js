import { ethers } from 'ethers';
import Locker from '../../artifacts/contracts/TokenLock.sol/TokenLock';

export default async function deploy(historyContract, signer, beneficiary, lockTime, value) {
  const factory = new ethers.ContractFactory(
    Locker.abi,
    Locker.bytecode,
    signer
  );
  return factory.deploy(historyContract, beneficiary, lockTime, { value });
}
