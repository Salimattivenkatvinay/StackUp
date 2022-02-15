// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Owner {

    address private owner;
    mapping(address => bool) private moderators;

    // event for EVM logging
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    event ModeratorAdded(address indexed moderator);

    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    // modifier to check if caller is owner
    modifier isModerator() {
        require(moderators[msg.sender], "Caller is not moderator");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor() {
        owner = msg.sender;
        // 'msg.sender' is sender of current call, contract deployer for a constructor
        emit OwnerSet(address(0), owner);
    }

    /**
     * @dev Change owner
     * @param newOwner address of new owner
     */
    function changeOwner(address newOwner) public isOwner {
        emit OwnerSet(owner, newOwner);
        owner = newOwner;
    }

    function addModerator(address moderator) public isOwner {
        emit ModeratorAdded(moderator);
        moderators[moderator] = true;
    }

    /**
     * @dev Return owner address
     * @return address of owner
     */
    function getOwner() external view returns (address) {
        return owner;
    }

//    function getModerators() external view returns (address[]) {
//        address [] res = new address[moderators.length];
//        for(uint i=0; i< moderators.length; i++){
//            res[i] = moderators[i];
//        }
//        return res;
//    }
}