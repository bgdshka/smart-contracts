import { ethers } from 'hardhat';

async function main() {
  const Wallet = await ethers.getContractFactory('MultisigWalletV1');
  const wallet = await Wallet.deploy(
    ['0x2DbF1B40f0593e338E56A2C2E6bEaDE46Ac83E8B'],
    1
  );

  await wallet.deployed();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
