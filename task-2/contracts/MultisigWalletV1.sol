// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

pragma solidity ^0.8.18;

// Создать MultiSig кошелек, позволяющий пользователям хранить и передавать токены ETH, WETH, USDT

// @bgdshka
contract MultisigWalletV1 {
    using SafeERC20 for IERC20;

    event Deposit(address indexed sender, uint amount);
    event Submit(uint indexed txId);
    event Approve(address indexed owner, uint indexed txId);
    event Revoke(address indexed owner, uint indexed txId);
    event Execute(uint indexed txId);

    address public constant WETH_ADDRESS =
        0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDT_ADDRESS =
        0xdAC17F958D2ee523a2206206994597C13D831ec7;

    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        string name; // ETH, WETH, USDT
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint public confirmations;

    // txId => owner => confirm
    mapping(uint => mapping(address => bool)) public approved;
    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    modifier txExist(uint _txId) {
        require(_txId < transactions.length, "Tx does not exist");
        _;
    }

    modifier notApproved(uint _txId) {
        require(!approved[_txId][msg.sender], "Tx already approved");
        _;
    }

    modifier notExecuted(uint _txId) {
        require(!transactions[_txId].executed, "Tx already executed");
        _;
    }

    constructor(address[] memory _owners, uint _confirmations) {
        require(_owners.length > 0, "Owners required");
        require(
            _confirmations > 0 && _confirmations <= _owners.length,
            "Invalid number of required confirmations"
        );

        for (uint i; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner is not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        confirmations = _confirmations;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function depositToken(address token, uint amount) external {
        require(amount > 0, "Cannot fund with 0 tokens");
        require(
            token == WETH_ADDRESS || token == USDT_ADDRESS,
            "Should be WETH or USDT"
        );
        // approve to spend tokens from contract
        IERC20(token).approve(address(this), amount);
        IERC20(token).transfer(msg.sender, amount);
        emit Deposit(msg.sender, amount);
    }

    function submitETH(
        address _to,
        uint _value,
        bytes calldata _data
    ) external onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                name: "ETH"
            })
        );
        emit Submit(transactions.length - 1);
    }

    function submitToken(
        address _to,
        uint _value,
        bytes calldata _data,
        string memory name
    ) external onlyOwner {
        require(
            keccak256(abi.encodePacked(name)) == keccak256("WETH") ||
                keccak256(abi.encodePacked(name)) == keccak256("USDT"),
            "Require only WETH and USDT tokens"
        );
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                name: name
            })
        );
        emit Submit(transactions.length - 1);
    }

    function approve(
        uint _txId
    ) external onlyOwner txExist(_txId) notApproved(_txId) notExecuted(_txId) {
        approved[_txId][msg.sender] = true;
        emit Approve(msg.sender, _txId);
    }

    function _getApprovalCount(uint _txId) private view returns (uint count) {
        for (uint i; i < owners.length; i++) {
            if (approved[_txId][owners[i]]) {
                count++;
            }
        }
    }

    function execute(uint _txId) external txExist(_txId) notExecuted(_txId) {
        require(
            _getApprovalCount(_txId) >= confirmations,
            "Approvals less than required"
        );
        Transaction storage transaction = transactions[_txId];

        if (keccak256(abi.encodePacked(transaction.name)) == keccak256("ETH")) {
            (bool success, ) = transaction.to.call{value: transaction.value}(
                transaction.data
            );
            require(success, "Tx failed");

            transaction.executed = true;
            emit Execute(_txId);
        } else if (
            keccak256(abi.encodePacked(transaction.name)) == keccak256("WETH")
        ) {
            IERC20(WETH_ADDRESS).transferFrom(
                address(this),
                transaction.to,
                transaction.value
            );
        } else if (
            keccak256(abi.encodePacked(transaction.name)) == keccak256("USDT")
        ) {
            IERC20(USDT_ADDRESS).transferFrom(
                address(this),
                transaction.to,
                transaction.value
            );
        }
    }

    function revoke(
        uint _txId
    ) external onlyOwner txExist(_txId) notExecuted(_txId) {
        require(!approved[_txId][msg.sender], "Tx approval required");
        approved[_txId][msg.sender] = false;
        emit Revoke(msg.sender, _txId);
    }
}
