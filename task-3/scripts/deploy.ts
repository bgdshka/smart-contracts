import { ethers } from 'hardhat';

async function main() {
  const NFT = await ethers.getContractFactory('NFT');
  const nft = await NFT.deploy(
    'ipfs://bafybeidb6qgvzk5x7b3m3xe23modl5sri6omge2wiogywvmqdf44j2augy/'
  );

  await nft.deployed();
  console.log(nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
