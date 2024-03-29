// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "contracts/EntryPoint.sol";

contract AccountFactory {
    function createAccount(address _owner) public returns (address) {
        Account newAccount = new Account(_owner);
        return address(newAccount);
    }
}