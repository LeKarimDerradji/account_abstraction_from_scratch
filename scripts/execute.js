const { EntryPoint__factory } = require("@account-abstraction/contracts");
const hre = require("hardhat");

const FACTORY_NONCE = 1;
const FACTORY_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const EP_ADDRESS = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512";

async function main() {
  try {
    const entryPoint = await hre.ethers.getContractAt("EntryPoint", EP_ADDRESS);
    const epDepAddress = await entryPoint.getAddress();
    console.log("EntryPoint Contract:", epDepAddress);

    const sender = hre.ethers.getCreateAddress({
      from: FACTORY_ADDRESS,
      nonce: FACTORY_NONCE,
    });

    const AccountFactory = await hre.ethers.getContractFactory(
      "AccountFactory"
    );
    const Account = await hre.ethers.getContractFactory("Account");

    const [signer0] = await hre.ethers.getSigners();
    const address0 = await signer0.getAddress();
    console.log(address0);

    // Ensure proper encoding of the function data
    const createAccountFunctionData = AccountFactory.interface
      .encodeFunctionData("createAccount", [address0])
      .slice(2);
    const executeFunctionData = Account.interface.encodeFunctionData("execute");

    //const initCode = FACTORY_ADDRESS + createAccountFunctionData;

    console.log(sender);
    

    await entryPoint.depositTo("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", { value: hre.ethers.parseUnits("100")});

    console.log(createAccountFunctionData);

    const userOp = {
      sender,
      nonce: await entryPoint.getNonce(FACTORY_ADDRESS, 2),
      initCode: "0x",
      callData: executeFunctionData, // No need for callData as we're using 'createAccount'
      callGasLimit: 200_000,
      verificationGasLimit: 200_000,
      preVerificationGas: 50_000,
      maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
      maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
      paymasterAndData: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      signature: "0x",
    };

    console.log("UserOp:", userOp);

    const tx = await entryPoint.handleOps([userOp], address0);
    console.log("Transaction Hash:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);
  } catch (error) {
    console.error("Error occurred:", error);
    // Add more detailed error information if available
    if (error.code === "UNSUPPORTED_OPERATION") {
      console.error("Unsupported operation details:", error.info);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
