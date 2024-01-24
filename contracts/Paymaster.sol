// SPDX-License-Identifier: UNLICENSED
import "@account-abstraction/contracts/interfaces/IPaymaster.sol";
pragma solidity ^0.8.9;

contract Paymaster is IPaymaster {
    function validatePaymasterUserOp(UserOperation calldata, bytes32, uint256)
        external
        pure
        override
        returns (bytes memory context, uint256 validationData)
    {
        context = new bytes(0);
        validationData = 0;
    }

    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external override {}
}