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

contract WalletV1 is Ownable {

  uint256 private fee = 0.001 ether;
  address private feeAddress = address(0); // deflationary model :)

  mapping(address => mapping(address => uint256)) private allowances;

 constructor() payable {}
  
  fallback() external payable {}
  
  receive() external payable {}
  
  function changeFee(uint256 _fee) external onlyOwner {
      fee = _fee;
  }  

  function fundWithToken(address token, uint amount) external {
      require(amount > 0, "Cannot fund with 0 tokens");
      require(IERC20(token).allowance(msg.sender, address(this)) >= amount, "Token allowance not set");
      require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Token transfer failed");
  }

  function sendETH(address payable to, uint weiAmount) public onlyOwner {
      require(address(this).balance >= weiAmount + fee, "Insufficient balance in the contract");
      to.transfer(weiAmount);
      payable(feeAddress).transfer(fee);
  }

   function sendTokens(address token, address to, uint256 amount) public {
    if (msg.sender != owner()) {
        require(allowances[token][msg.sender] >= amount, "Insufficient allowance");
        allowances[token][msg.sender] -= amount;
    }
    require(IERC20(token).transfer(to, amount), "Token transfer failed");
   } 

   function addTokenAllowance(address token, address spender, uint256 amount) external onlyOwner {
    allowances[token][spender] = amount;
  }

  function removeTokenAllowance(address token, address spender) external onlyOwner {
    delete allowances[token][spender];
  }
}