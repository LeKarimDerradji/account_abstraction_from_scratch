// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const EP_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const AF_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const EP_CODE = await hre.ethers.provider.getCode(EP_ADDRESS)
  const AF_CODE = await hre.ethers.provider.getCode(AF_ADDRESS)

  console.log(`EntryPoint code : ${EP_CODE}`);
  console.log(`AccountFactory code : ${AF_CODE}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
