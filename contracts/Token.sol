//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    address public owner;
    address public vendor;

    constructor() ERC20("JakeCoin", "JKC") {
        owner = msg.sender;
        _mint(msg.sender, 1000000000);
    }

    function decimals() public pure override returns (uint8 dec) {
        return 0;
    }

    function setVendor(address _vendorAddr) external OwnerOnly {
        vendor = _vendorAddr;
    }

    function vendorMint(address _account, uint256 _amount) public VendorOnly {
        _mint(_account, _amount);
    }

    modifier VendorOnly {
        require(msg.sender==vendor, "Not Allowed");
        _;
    }

    modifier OwnerOnly {
        require(msg.sender==owner, "Not Allowed");
        _;
    }
}