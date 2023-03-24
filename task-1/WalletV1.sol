// SPDX-License-Identifier: GPL-3.0

// Написать смарт-контракт вида "кошелек".
// Смарт-контракт должен иметь необходимую и достаточную функциональность, 
// чтобы контракт мог использоваться в качестве обычного адреса в сети Ethereum:

// - Возможность отправлять/принимать ETH
// - Возможность отправлять/принимать токены
// - Возможность делать allowance для токенов

// В смарт-контракта должен присутствовать метод или функциональность, 
// который позволяет установить комиссию для переводов эфира:

// - Должен присутствовать метод, изменяющий значение этой комиссии
// - Комиссия - представляет из себя какое-то число от переводимой суммы
// - Перевод этой комиссии должен производиться вместе с обычным переводом
// - Адрес для перевода зашит в контракт хардкодом

// @bgdshka
pragma solidity 0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract WalletV1 is Ownable {

  uint256 private ethFee = 0.001 ether;
  uint256 private erc20Fee = 2; // 2% fee on ERC20 transactions
  address private feeAddress = address(0); // deflationary model :)

  mapping(address => mapping(address => uint256)) private allowances;

  constructor() payable {}
  
  fallback() external payable {}
  
  receive() external payable {}
  
   function changeEthFee(uint256 _ethFee) external onlyOwner {
      ethFee = _ethFee;
  }  

  function changeErc20Fee(uint256 _erc20Fee) external onlyOwner {
      erc20Fee = _erc20Fee;
  }  

  function fundWithToken(address token, uint amount) external {
      require(amount > 0, "Cannot fund with 0 tokens");
      require(IERC20(token).allowance(msg.sender, address(this)) >= amount, "Token allowance not set");
      require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");
  }

  function sendETH(address payable to, uint weiAmount) public onlyOwner {
      require(address(this).balance >= weiAmount + ethFee, "Insufficient balance in the contract");
      to.transfer(weiAmount);
      payable(feeAddress).transfer(ethFee);
  }

   function sendTokens(address token, address to, uint256 amount) public {
    uint256 feeAmount = amount.mul(erc20Fee).div(100); 
    uint256 totalAmount = amount.add(feeAmount); 

    if (msg.sender != owner()) {
        require(allowances[token][msg.sender] >= totalAmount, "Insufficient allowance");
        allowances[token][msg.sender] = allowances[token][msg.sender].sub(totalAmount);
    }
    
    require(IERC20(token).transfer(to, amount), "Token transfer failed");
    require(IERC20(token).transfer(feeAddress, feeAmount), "Fee transfer failed");
   } 

   function addTokenAllowance(address token, address spender, uint256 amount) external onlyOwner {
    allowances[token][spender] = amount;
  }

  function removeTokenAllowance(address token, address spender) external onlyOwner {
    delete allowances[token][spender];
  }
}
