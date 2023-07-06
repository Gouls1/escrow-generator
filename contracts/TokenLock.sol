// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IHistoryContract {
	function newLocker(address _ca, address _beneficiary, uint _value, uint lockPeriod, string memory typeOf, address _deployer) external;
}
contract TokenLock {
    address public depositor;
    address public beneficiary;
    uint public lockPeriod;
    uint public lockDelay;

    address public historyContract;

    constructor(address _historyContract, address _beneficiary, uint _lockPeriod) payable {
        historyContract = _historyContract;
        depositor = msg.sender;
        beneficiary = _beneficiary;
        lockPeriod = _lockPeriod;
        lockDelay = block.timestamp + (3600 * 24 * _lockPeriod); 
        //Solidity base unit is second - calculates the amount of seconds given a _lockPeriod in days

        addToHistory(address(this), beneficiary, msg.value, lockPeriod, "Locker Contract", depositor);
    }

    function addToHistory(address contractAddress, address _beneficiary, uint _value, uint _lockPeriod, string memory typeOf, address _deployer) public {
		
		IHistoryContract(historyContract).newLocker(contractAddress, _beneficiary, _value, _lockPeriod, typeOf, _deployer);
	}

    event Claimed(uint);
    function claim() external {
        require(beneficiary == msg.sender, "You are not the beneficiary");
        require(block.timestamp > lockDelay, "Balance is still locked");
        uint balance = address(this).balance;

        (bool s, ) = payable(beneficiary).call{ value: address(this).balance }("");
            require(s, "Did not send");
        
        emit Claimed(balance);
    }

}