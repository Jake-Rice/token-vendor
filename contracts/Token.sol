//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("JakeCoin", "JKC") {
        _mint(msg.sender, 1000000000);
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }
}