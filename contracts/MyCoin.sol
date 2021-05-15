// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Interfaces/IERC20.sol";

contract MyCoin is IERC20 {

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalSupply) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply;
    }

    function approve(address _spender, uint256 _value) external returns (bool) {
        require(_spender != address(0), "Address is Null");
        require(balanceOf[msg.sender] >= _value, "Insuffectin Funds / Coins");

        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);
        return (true);
    }

    function transfer(address _to, uint256 _value) external returns (bool) {
        require(balanceOf[msg.sender] >= _value, "Insuffectin Funds / Coins");

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return (true);
    }

    function transferFrom(address _from, address _to, uint256 _value ) external returns (bool) {
        require(_value <= allowance[_from][_to], "Transaction is not Approved");

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);
        return (true);
    }
    //This makes it so that only the owner or person who lanuches the smart contact can create more coins 
    //Or at least call the minting function.
    function _mint(address _to, uint256 _amount) internal returns (bool) {

        balanceOf[_to] += _amount;
        totalSupply -= _amount;

        emit Transfer(address(0), _to, _amount);
        return (true);
    }
    
    //10000 is the amount of tokens per 1 ether
    function() external payable {
        require(msg.value * 10000 < totalSupply);
        _mint(msg.sender, msg.value * 10000);
    }

}