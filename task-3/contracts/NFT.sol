// 1. Создание картинок
// 2. Залить картинки и метадату на IPFS
// 3. Написать смарт контракт со следующим функционалом:
//     1. Покупатель платит 0.01 ETH за минт 1 нфт. Владелец контракта нфт НЕ МИНТИТ
//     2. Каждые 10 покупок цена минта увеличивается на 0.005 ETH.
//     3. Есть возможность сделать все то же самое за WETH
//     4. Owner может поставить минт и трансфер на паузу (никто не сможет вызывать эти функции)
// 4. Задеплоить в тестовую сеть
// 5. Должно корректно отображаться на Opensea

// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// @bgdshka
contract NFT is ERC721, Ownable {
    using SafeERC20 for IERC20;
    using Strings for uint256;

    string public baseURI;
    uint256 private defaultETHPrice = 0.01 ether;
    uint256 private defaultWETHPrice = 0.01e18;
    uint256 public totalSupply = 100;
    uint256 public currentItem = 1;
    bool public paused = false;

    constructor(string memory _uri) ERC721("Rains", "RNS") {
        setBaseURI(_uri);
    }

    fallback() external payable {}

    receive() external payable {}

    modifier withNotOver() {
        require(!paused, "Minting is paused");
        require(currentItem < totalSupply, "Sold out");
        _;
    }

    function buyWithEth() public payable withNotOver {
        uint256 currentPrice = defaultETHPrice +
            ((currentItem / 10) * 0.005e18);
        require(msg.value == currentPrice, "Incorrect price");

        _safeMint(msg.sender, currentItem);
        currentItem++;
    }

    function buyWithWETH(uint256 wethAmount) public withNotOver {
        uint256 currentPrice = defaultWETHPrice +
            ((currentItem / 10) * 0.005e18);
        require(wethAmount == currentPrice, "Incorrect price");

        IERC20 wethToken = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2); // Mainnet WETH address
        wethToken.safeTransferFrom(msg.sender, address(this), wethAmount);

        _safeMint(msg.sender, currentItem);
        currentItem++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function withdraw() public payable onlyOwner {
        uint256 ethBalance = address(this).balance;
        if (ethBalance > 0) {
            (bool sent, ) = payable(owner()).call{value: msg.value}("");
            require(sent, "Failed to send Ether");
        }

        IERC20 wethToken = IERC20(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2); // Mainnet WETH address
        uint256 wethBalance = wethToken.balanceOf(address(this));
        if (wethBalance > 0) {
            wethToken.safeTransferFrom(address(this), owner(), wethBalance);
        }
    }
}
