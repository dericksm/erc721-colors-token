pragma solidity ^0.5.0;

import "./ERC721Full.sol";

contract Color is ERC721Full {
    string[] public colors;
    mapping(string => bool) colorExists;

    constructor() ERC721Full("Color", "CLR") public {}

    function mint(string memory _color) public {
        require(!colorExists[_color]);
        uint _id = colors.push(_color);
        _mint(msg.sender, _id);
        colorExists[_color] = true;
    }
}