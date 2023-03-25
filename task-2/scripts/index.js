import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import tokenAbi from '../artifacts/contracts/MultisigWalletV1.sol/MultisigWalletV1.json';

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/nUKETF-iIVHB9_SoT2aWwTh_dLoDVQRy'
);
const walletAddress = '0x935391b3828274565c298ccd8bb476522B21d2c9';
const signer = new ethers.Wallet(process.env.KEY, provider);
const contract = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);

const deposit = async () => {
  const res = await contract.depositToken(
    '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    100
  );

  console.log(res);
};

deposit();
