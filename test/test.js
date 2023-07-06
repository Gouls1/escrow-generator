const { ethers } = require('hardhat');
const { expect } = require('chai');

const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe('Vesting', function () {
  let contract;
  let depositor;
  let beneficiary;
  const numberOfClaims = 10;
  const vestingIntervals = 30;
  const deposit = ethers.utils.parseEther('1');
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);
    let vestingStart = await time.latest();
    const Vesting = await ethers.getContractFactory('Vesting');
    contract = await Vesting.deploy(
      beneficiary.getAddress(),
      numberOfClaims,
      vestingIntervals,
      vestingStart,
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  it('should call claim and print my stuff', async function () {
    let vestingStart = await time.latest();
    console.log(vestingStart);
    console.log(vestingStart);
    let tx = await contract.connect(beneficiary).claim();
    await time.increase(27);
    let tx3 = await contract.connect(beneficiary).claim();
    await time.increase(2);
    let tx4 = await contract.connect(beneficiary).claim();
    await time.increase(60);
    let tx5 = await contract.connect(beneficiary).claim();




  });



  // describe('after approval from address other than the arbiter', () => {
  //   it('should revert', async () => {
  //     await expect(contract.connect(beneficiary).approve()).to.be.reverted;
  //   });
  // });

  // describe('after approval from the arbiter', () => {
  //   it('should transfer balance to beneficiary', async () => {
  //     const before = await ethers.provider.getBalance(beneficiary.getAddress());
  //     const approveTxn = await contract.connect(arbiter).approve();
  //     await approveTxn.wait();
  //     const after = await ethers.provider.getBalance(beneficiary.getAddress());
  //     expect(after.sub(before)).to.eq(deposit);
  //   });
  // });
});
