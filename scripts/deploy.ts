// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

import hre from "hardhat"

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory(
    "SimpleStorage"
  )
  console.log("Deploying contract....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log(`Contract deployed: ${simpleStorage.address}`)

  if (hre.network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block conrimation...")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  } else if (
    hre.network.config.chainId === 5 &&
    process.env.ETHERSCAN_API_KEY
  ) {
    console.log("Waiting for block confirmation")
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  let currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  const transactionResponse = await simpleStorage.store(100)
  await transactionResponse.wait(1)

  currentValue = await simpleStorage.retrieve()
  console.log(`Updated value: ${currentValue}`)
}

const verify = async (contractAddress: string, args: any[]) => {
  console.log("Verifying contract......")

  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }

  // to verify polygon run yarn hardhat verify CONTRACT_ADDR --network polygon
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
