import { ethers } from 'hardhat';

async function main() {
  const ipfs = 'bafybeigpiorymyolqjvr3mbb2s5sqxm4ap6hsgeni3pacnlu2yssfkloxy';
  const baseUri = `ipfs://${ipfs}/`;
  const NFT = await hre.ethers.getContractFactory('NFT');
  const nft = await NFT.deploy(baseUri);

  await nft.deployed();

  console.log(`NFT deployed to ${nft.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
