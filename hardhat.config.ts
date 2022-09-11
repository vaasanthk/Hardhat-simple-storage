import "@nomicfoundation/hardhat-toolbox"
import "dotenv/config"
import "@nomiclabs/hardhat-waffle"
import "hardhat-gas-reporter"
import "solidity-coverage"
import "@nomiclabs/hardhat-etherscan"

/** @type import('hardhat/config').HardhatUserConfig */

// rinkeby testnet
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-rinkeby"
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY || "0xkey"

// goerli testnet
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-rinkeby"
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY || "0xkey"

// polygon testnet
const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL || "https://eth-rinkeby"
const POLYGON_PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY || "0xkey"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key"
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "key"

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key"

module.exports = {
  solidity: "0.8.9",

  defaultNetwork: "hardhat",

  networks: {
    localhost: {
      url: "http://localhost:8545",
      chainId: 31337,
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [RINKEBY_PRIVATE_KEY],
      chainId: 4,
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },

    polygon: {
      url: POLYGON_RPC_URL,
      accounts: [POLYGON_PRIVATE_KEY],
      chainId: 80001,
    },
  },

  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY,
      goerli: ETHERSCAN_API_KEY,
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: COINMARKETCAP_API_KEY,
    // token: "MATIC",
  },
}
