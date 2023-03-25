import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  etherscan: {
    apiKey: 'TFR1IF5VI6HQH49SF9XB88S71M61I1QPD9', //etherscan API key
  },
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/nUKETF-iIVHB9_SoT2aWwTh_dLoDVQRy',
      accounts: [process.env.KEY as string],
    },
  },
};

export default config;
