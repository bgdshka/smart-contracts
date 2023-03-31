// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721, Ownable {
    using Strings for uint256;

    string public baseURI;
    uint public _totalSupply;

    constructor(string memory _uri) ERC721("Elective 3", "E3") {
        setBaseURI(_uri);
        mint(msg.sender, 1);
    }

    function mint(address _to, uint256 _mintAmount) public payable onlyOwner {
        uint256 supply = totalSupply();
        require(_mintAmount > 0);
        require(_totalSupply + _mintAmount <= 10000, "Too much");
        for (uint256 i = 0; i < _mintAmount; ++i) {
            _safeMint(_to, supply + i);
        }
        _totalSupply += _mintAmount;
    }

    function totalSupply() private view returns (uint) {
        return _totalSupply;
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
}
