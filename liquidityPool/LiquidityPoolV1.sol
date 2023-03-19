// SPDX-License-Identifier: GPL-3.0

// The `LiquidityPool` contract takes in two `IERC20` token instances (`tokenA` and `tokenB`) and a fixed amount of governance tokens (`governanceTokenAmount`) as constructor arguments. It also takes in the address where the governance tokens will be transferred (`governanceTokenAddress`). 
// The contract allows users to add liquidity to the pool using the `addLiquidity` function. The amount of liquidity each user receives is proportional to the amount of tokens they add relative to the total pool liquidity. The contract stores the liquidity of each user in the `liquidity` mapping and the total liquidity in the `totalLiquidity` variable.
// The `removeLiquidity` function allows users to remove their liquidity from the pool. The function calculates the amounts of each token the user will receive based on their share of the pool liquidity and transfers the tokens to the user.
// The `swapTokens` function allows users to swap one token for the other. The function calculates the expected output amount based on the current pool ratio and ensures that the output amount is not less than the desired amount. The function also takes a small fee on each transaction (`FEE`) and transfers it to the `governanceTokenAddress` address. 
// Finally, the `claimGovernanceTokens` function allows users to claim their share of the governance tokens after the lock period has ended. The function transfers the remaining balance of `tokenA` to the `governanceTokenAddress` address and transfers the fixed `governanceTokenAmount` to the user.

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LiquidityPoolV1 {
    using SafeMath for uint256;
    
    IERC20 public tokenA;
    IERC20 public tokenB;
    
    uint256 public totalLiquidity;
    mapping(address => uint256) public liquidity;
    
    uint256 public constant FEE = 0.003 ether; // 0.3% fee on each transaction
    uint256 public constant DURATION = 30 days; // Lock period for liquidity
    uint256 public startTime;
    address public governanceTokenAddress;
    uint256 public governanceTokenAmount;
    
    constructor(IERC20 _tokenA, IERC20 _tokenB, uint256 _governanceTokenAmount, address _governanceTokenAddress) {
        tokenA = _tokenA;
        tokenB = _tokenB;
        governanceTokenAmount = _governanceTokenAmount;
        governanceTokenAddress = _governanceTokenAddress;
        startTime = block.timestamp;
    }
    
    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        require(_amountA > 0 && _amountB > 0, "Amounts must be greater than zero");
        uint256 liquidityAmount;
        if (totalLiquidity == 0) {
            liquidityAmount = _amountA;
        } else {
            liquidityAmount = _amountA.mul(totalLiquidity).div(tokenA.balanceOf(address(this)));
        }
        require(liquidityAmount > 0, "Liquidity amount must be greater than zero");
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        liquidity[msg.sender] += liquidityAmount;
        totalLiquidity += liquidityAmount;
    }
    
    function removeLiquidity(uint256 _amount) external {
        require(liquidity[msg.sender] >= _amount, "Insufficient liquidity");
        uint256 amountA = _amount.mul(tokenA.balanceOf(address(this))).div(totalLiquidity);
        uint256 amountB = _amount.mul(tokenB.balanceOf(address(this))).div(totalLiquidity);
        liquidity[msg.sender] -= _amount;
        totalLiquidity -= _amount;
        tokenA.transfer(msg.sender, amountA);
        tokenB.transfer(msg.sender, amountB);
    }
    
    function swapTokens(uint256 _amountIn, uint256 _amountOut) external {
        require(_amountIn > 0 && _amountOut > 0, "Amounts must be greater than zero");
        uint256 amountA = tokenA.balanceOf(address(this));
        uint256 amountB = tokenB.balanceOf(address(this));
        uint256 amountOutExpected = amountB.mul(_amountIn).div(amountA);
        require(_amountOut <= amountOutExpected, "Insufficient output amount");
        tokenA.transferFrom(msg.sender, address(this), _amountIn);
        uint256 fee = _amountIn.mul(FEE).div(1 ether);
        tokenA.transfer(governanceTokenAddress, fee); // Transfer fee to governance token address
        tokenB.transfer(msg.sender, _amountOut);
    }
    
    function claimGovernanceTokens() external {
        require(block.timestamp >= startTime.add(DURATION), "Lock period not over yet");
        uint256 balance = tokenA.balanceOf(address(this));
        tokenA.transfer(governanceTokenAddress, governanceTokenAmount);
        governanceTokenAmount = 0; // Reset the governance token amount to prevent double claiming
  }
}

