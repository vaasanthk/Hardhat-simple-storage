import { expect } from "chai"
import { ethers } from "hardhat"
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types"

describe("SimpleStorage", function () {
  let simpleStorage: SimpleStorage
  let SimpleStorageFactory: SimpleStorage__factory
  beforeEach(async () => {
    SimpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory
    simpleStorage = await SimpleStorageFactory.deploy()
  })
  it("Should start with a favorite number of 0", async function () {
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(0)
  })
  it("Should update when we call store", async function () {
    let expectedValue = 7
    let transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait()
    let currentValue = await simpleStorage.retrieve()
    expect(currentValue).to.equal(expectedValue)
  })

  it("Should update addperson function and retrieve from array", async function () {
    const expectedName = "Vasi"
    const expectedValue = "10"

    const transactionResponse = await simpleStorage.addPerson(
      expectedName,
      expectedValue
    )
    await transactionResponse.wait(1)

    const { favoriteNumber, name } = await simpleStorage.people(0)

    expect(name).to.equal(expectedName)
    expect(favoriteNumber).to.equal(expectedValue)
  })
})
