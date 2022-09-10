const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", async function () {
  let SimpleStorageFactory, simpleStorage

  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it("Should start with favorite value with 0", async function () {
    const expectedValue = 0
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue, expectedValue)
  })

  it("Should store the value in store function", async function () {
    const expectedValue = 100
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()

    assert.equal(currentValue, expectedValue)
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

    assert.equal(name, expectedName)
    assert.equal(favoriteNumber, expectedValue)
  })
})
