//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface Token {
    function balanceOf(address _addr) external view returns (uint256);
    function decimals() external pure returns (uint8);
    function vendorMint(address _account, uint256 _amount) external;
}


contract TokenVendor {
    uint8 decimals;
    address public tokenAddr;
    uint256 public weiPerToken = 1000000000000;

    constructor(address _tokenAddr) {
        tokenAddr = _tokenAddr;
        decimals = Token(tokenAddr).decimals();
    }

    function buyTokens(uint256 _numTokens) external payable {
        require(_numTokens == (msg.value-(msg.value % weiPerToken))/weiPerToken, "Insufficient funds");
        Token(tokenAddr).vendorMint(msg.sender, _numTokens);
    }

    receive() external payable {
        Token(tokenAddr).vendorMint(msg.sender, (msg.value - (msg.value % weiPerToken)) / weiPerToken );
    }
}