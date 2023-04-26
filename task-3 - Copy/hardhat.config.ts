import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  networks: {
    polygon_mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.KEY as string],
    },
  },
  etherscan: {
    apiKey: { polygonMumbai: 'I2V45CBSARPFEFPWAEPWU9QEVW66IKFUJP' }, //polygonscan API key
  },
};

export default config;
