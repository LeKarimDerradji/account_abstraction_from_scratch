// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ACCOUNT_ADDRESS = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5";
async function main() {
  const EP_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const AF_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const PM_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const EP_CODE = await hre.ethers.provider.getCode(EP_ADDRESS);
  const AF_CODE = await hre.ethers.provider.getCode(AF_ADDRESS);
  const Account = await hre.ethers.getContractAt("Account", ACCOUNT_ADDRESS);
  const count = await Account.count();

  console.log("Count is at: ", count);

  console.log(`EntryPoint code : ${EP_CODE}`);
  console.log(`AccountFactory code : ${AF_CODE}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
