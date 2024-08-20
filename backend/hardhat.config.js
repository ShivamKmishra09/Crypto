// https://eth-sepolia.g.alchemy.com/v2/dSlHFPCBJmFtHpcUGpzhSHKAMiy27Wl8

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/dSlHFPCBJmFtHpcUGpzhSHKAMiy27Wl8",
      accounts: [
        "72832fb8ebd685a1f16d08b64c05b9a1068ed2b5bd8fb080b9400970133467a1",
      ],
      timeout: 200000
    },
  },
};
