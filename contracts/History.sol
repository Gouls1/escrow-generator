// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "hardhat/console.sol";


contract History {
    
    struct myEscrow {
        address contractAddress;
        address arbiter;
        address beneficiary;
        uint value;
        string typeOf;
        uint lockPeriod;
        uint numberOfClaims;
    }

    mapping(address => myEscrow[]) public escrowAsDeployer;
    mapping(address => myEscrow[]) public escrowAsArbiter;
    mapping(address => myEscrow[]) public escrowAsBeneficiary;

    mapping(address => myEscrow[]) public lockerAsDeployer;
    mapping(address => myEscrow[]) public lockerAsBeneficiary;

    mapping(address => myEscrow[]) public vesterAsDeployer;
    mapping(address => myEscrow[]) public vesterAsBeneficiary;

    function newEscrow(address _ca, address _arbiter, address _beneficiary, uint _value, string calldata _typeOf, address _deployer) public {
        require(msg.sender == _ca, 'Random users cannot add to history');

        myEscrow memory deployed = myEscrow({
            contractAddress: _ca,
            arbiter: _arbiter,
            beneficiary: _beneficiary,
            value: _value,
            typeOf: _typeOf,
            lockPeriod: 0,
            numberOfClaims: 0
        });

        escrowAsDeployer[_deployer].push(deployed);
        escrowAsArbiter[_arbiter].push(deployed);
        escrowAsBeneficiary[_beneficiary].push(deployed);
    }

    function viewEscrow(address _user) external view returns(myEscrow[] memory) {
        return escrowAsDeployer[_user];
    }

    function viewAsArbiter(address _user) external view returns(myEscrow[] memory) {
        return escrowAsArbiter[_user];
    }

    function viewAsBeneficiary(address _user) external view returns(myEscrow[] memory) {
        return escrowAsBeneficiary[_user];
    }

    function newLocker(address _ca, address _beneficiary, uint _value, uint _lockPeriod, string calldata _typeOf, address _deployer) public {
        require(msg.sender == _ca, 'Random users cannot add to history');

        myEscrow memory deployed = myEscrow({
            contractAddress: _ca,
            arbiter: address(0),
            beneficiary: _beneficiary,
            value: _value,
            typeOf: _typeOf,
            lockPeriod: _lockPeriod,
            numberOfClaims: 0
        });
        lockerAsDeployer[_deployer].push(deployed);
        lockerAsBeneficiary[_beneficiary].push(deployed);
    }

    function viewLockerAsBeneficiary(address _user) external view returns(myEscrow[] memory) {
        return lockerAsBeneficiary[_user];
    }

    function viewLockerAsDeployer(address _user) external view returns(myEscrow[] memory) {
        return lockerAsDeployer[_user];
    }

        function newVester(address _ca, address _beneficiary, uint _value, uint _numberOfClaims, string calldata _typeOf, address _deployer) public {
        require(msg.sender == _ca, 'Random users cannot add to history');

        myEscrow memory deployed = myEscrow({
            contractAddress: _ca,
            arbiter: address(0),
            beneficiary: _beneficiary,
            value: _value,
            typeOf: _typeOf,
            lockPeriod: 0,
            numberOfClaims: _numberOfClaims
        });
        vesterAsDeployer[_deployer].push(deployed);
        vesterAsBeneficiary[_beneficiary].push(deployed);
    }

    function viewVesterAsBeneficiary(address _user) external view returns(myEscrow[] memory) {
        return vesterAsBeneficiary[_user];
    }

    function viewVesterAsDeployer(address _user) external view returns(myEscrow[] memory) {
        return vesterAsDeployer[_user];
    }

}