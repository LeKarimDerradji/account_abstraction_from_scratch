// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@account-abstraction/contracts/core/EntryPoint.sol";

contract Account is IAccount {
    function validateUserOp(
        UserOperation calldata,
        bytes32,
        uint256
    ) external pure returns (uint256 validationData) {
        return 0;
    }
}
