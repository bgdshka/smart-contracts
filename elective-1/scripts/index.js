import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
import tokenAbi from '../artifacts/contracts/Token.sol/Token.json';

dotenv.config();

const provider = new ethers.providers.JsonRpcProvider(
  'https://eth-sepolia.g.alchemy.com/v2/nUKETF-iIVHB9_SoT2aWwTh_dLoDVQRy'
);
const tokenAddress = '0xc5E4C8eb887401d8B4458692F23E2FBDe60bc47F';
const signer = new ethers.Wallet(process.env.KEY, provider);
const contract = new ethers.Contract(tokenAddress, tokenAbi.abi, signer);

const read = async () => {
  const res = await contract.balanceOf(
    '0xc5E4C8eb887401d8B4458692F23E2FBDe60bc47F'
  );

  console.log(res);
};

const write = async () => {
  await contract.mint('0xc5E4C8eb887401d8B4458692F23E2FBDe60bc47F');
};

const listen = async () => {
  contract.on('Transfer', (from, to, value) => {
    console.log(from, to, value);
  });
};
listen();
write();
