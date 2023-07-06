// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "hardhat/console.sol";

interface IHistoryContract {
	function newEscrow(address _ca, address _arbiter, address _beneficiary, uint _value, string memory typeOf, address _deployer) external;
}

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;
	uint public value;

 	address public historyContract;

	bool isApproved;
	bool isCancelled;

	constructor(address _historyContract, address _arbiter, address _beneficiary) payable {
		historyContract = _historyContract;
		arbiter = _arbiter;
		require(arbiter != msg.sender, "Depositor cannot be the Arbitor");
		beneficiary = _beneficiary;
		value = msg.value;
		depositor = msg.sender;

		addToHistory(address(this), arbiter, beneficiary, value, "Simple Escrow", depositor);
	}

	function addToHistory(address contractAddress, address _arbiter, address _beneficiary, uint _value, string memory typeOf, address _deployer) public {
		
		IHistoryContract(historyContract).newEscrow(contractAddress, _arbiter, _beneficiary, _value, typeOf, _deployer);
	}

	event Approved(uint);
	function approve() external {
		require(msg.sender == arbiter, "You are not the arbitrer");
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}

	event Cancelled(uint);
	function cancel() external {
		require(msg.sender == arbiter, "You are not the arbitrer");
		uint balance = address(this).balance;
		(bool sent, ) = payable(depositor).call{value: balance}("");
		require(sent, "Failed to send Ether");
		emit Cancelled(balance);
		isCancelled = true;
	}
}
