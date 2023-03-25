// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

pragma solidity ^0.8.0;

contract Token is ERC20{
    
    event Transfer(address to);
    constructor() ERC20("yooooo", "YO") {}

    function mint(address to)  public {
        _mint(to, 1000);
        emit Transfer(to);
    }

}