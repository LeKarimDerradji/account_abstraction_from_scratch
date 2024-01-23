// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { EntryPoint__factory } = require("@account-abstraction/contracts");
const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const EP_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

async function main() {
  const entryPoint = await hre.ethers.deployContractAt(
    "EntryPoint",
    EP_ADDRESS
  );

  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE,
  });

  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress;
  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  const initCode =
    FACTORY_ADDRESS +
    AccountFactory.interface.encodeFunctionData("createAccount", [address0]);

  const Account = await hre.ethers.getContractFactory("Account");

  const userOp = {
    sender,
    nonce: entryPoint.getNonce(sender, 0),
    initCode: initCode,
    callData: Account.interface.encodeFunctionData("execute"), //CallData of the UserOp
    callGasLimit: 200_000,
    verificationGasLimit: 200_000,
    preVerificationGas: 50_000,
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
    paymasterAndData: "0x",
    signature: "0x",
  };

  const tx = await entryPoint.handleOps([userOp, address0]);
  const receit = await tx.wait();
  console.log(receit);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
