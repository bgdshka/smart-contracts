import { ethers } from 'hardhat';

async function main() {
  const NFT = await ethers.getContractFactory('NFT2');
  const nft = await NFT.deploy(
    'ipfs://bafybeifhvuc4ih66jjpddshcjycc64s2hdoezbfqhmxasfusmdcka6slse/'
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
