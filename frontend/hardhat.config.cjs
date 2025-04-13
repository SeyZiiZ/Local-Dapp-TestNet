require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://blockchain:8545",
      chainId: 1337,
    }
  }
};
