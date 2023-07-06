// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "hardhat/console.sol";

interface IHistoryContract {
	function newVester(address _ca, address _beneficiary, uint _value, uint _numberOfClaims, string memory typeOf, address _deployer) external;
}
contract Vesting {
    address public depositor;
    address public beneficiary;

    uint public vestingAmount; //Amount claimable per each vested period
    uint public claimableBalance; //Amount that is claimable at t time, depending on the amount of time that has passed 
    uint public vestingInterval; //the amount of time that needs to pass between claims eg. 24hours, 7 days... 
    uint public lastClaim;

     address public historyContract;

    constructor(address _historyContract, address _beneficiary, uint _numberOfClaims) payable {
        historyContract = _historyContract;
        depositor = msg.sender;
        beneficiary = _beneficiary;

        vestingAmount = (msg.value) / _numberOfClaims; // initial balance divided by the nmuber of periods eg. 12 (weeks)
        lastClaim = block.timestamp; // initially, when the vesting start, here the creation of the contract

        vestingInterval = 3600 * 24 * 7; //in second, multiplicators to reflect weekly vesting, could add an argument
        //to allow for daily, monthly, etc... claiming
        //vesting interval is the interval between claims ie. daily/weekly...

        addToHistory(address(this), beneficiary, msg.value, _numberOfClaims, "Vesting Contract", depositor);
    }

    function addToHistory(address contractAddress, address _beneficiary, uint _value, uint _numberOfClaims, string memory typeOf, address _deployer) public {
		
		IHistoryContract(historyContract).newVester(contractAddress, _beneficiary, _value, _numberOfClaims, typeOf, _deployer);
	}

    event Claimed(uint);
    function claim() external {
        require(beneficiary == msg.sender, "You are not the beneficiary");
        require(address(this).balance > 0, "You have already claimed everything");

        uint timeMultiplicator = ((block.timestamp - lastClaim) / vestingInterval); //multiplicator to time ajust claimable balance and lastCLaim 

        claimableBalance = timeMultiplicator * vestingAmount;

        if(claimableBalance > address(this).balance) {
            claimableBalance = address(this).balance;
        }
        require(claimableBalance > 0, "Not time to claim yet!");
        
        (bool s, ) = payable(beneficiary).call{value: claimableBalance}("");
            require(s, "Did not send"); 

        emit Claimed(claimableBalance);

        lastClaim += (timeMultiplicator * vestingInterval);           
    }
}