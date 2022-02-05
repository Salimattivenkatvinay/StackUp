// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./LoanPool.sol";
import "./Owner.sol";
import "./StackUpFactory.sol";

contract StackUpFactory is Owner {

    uint256 public totalPools;
    address mUsd = 0x70605Bdd16e52c86FC7031446D995Cf5c7E1b0e7;

    event NewLoanPool(
        uint256 id,
        address loanPool,
        uint256 collateralAmount,
        uint256 auctionInterval,
        uint256 auctionDuration,
        uint8 maxParticipants,
        address tokenAddress,
        address creator,
        uint256 createdAt
    );

    struct ChitSkeleton {
        uint256 id;
        uint256 collateralAmount; //max amount chit
        uint256 auctionInterval; // no of hours
        uint256 auctionDuration; //no of months
        uint8 maxParticipants;
        address tokenAddress;
        address creator;
        uint256 createdAt;
        address [] bidders;
    }

    mapping(string => ChitSkeleton) public chits;

    function addLoanPool(
        uint256 maximumBidAmount,
        uint256 auctionInterval,
        uint256 auctionDuration,
        uint8 maxParticipants,
        address token
    ) private {

        LoanPool newLoanPool = new LoanPool(
            maximumBidAmount,
            auctionInterval,
            auctionDuration,
            maxParticipants,
            token
        );

        address loanPool = address(newLoanPool);

        totalPools++;

        emit NewLoanPool(
            totalPools,
            loanPool,
            maximumBidAmount * maxParticipants,
            auctionInterval,
            auctionDuration,
            maxParticipants,
            token,
            msg.sender,
            block.timestamp
        );
    }


    function createLoanPool(
        uint256 maximumBidAmount,
        uint256 auctionInterval,
        uint256 auctionDuration,
        uint8 maxParticipants,
        address token
    ) public isModerator {

        ChitSkeleton chit = ChitSkeleton(
            maximumBidAmount,
            auctionInterval,
            auctionDuration,
            maxParticipants,
            token,
            msg.sender,
            block.timestamp,
            new address[maxParticipants]
        );
        chits[chit.maximumBidAmount + "" + chit.auctionInterval + "" + chit.auctionDuration + "" + chit.maxParticipants] = chit;
    }

    function addInterest(ChitSkeleton chit) payable {
        string chitKey = chit.maximumBidAmount + "" + chit.auctionInterval + "" + chit.auctionDuration + "" + chit.maxParticipants;
        address[] bidders = chits[chitKey].bidders;

        bool doesListContainElement = false;
        for (uint i = 0; i < bidders.length; i++) {
            if (msg.sender == bidders[i]) {
                doesListContainElement = true;
            }
        }
        require(!doesListContainElement, "already bid submitted bro");

        uint minAmount = chit.collateralAmount / chit.maxParticipants / 20;
        // taking 5%
        require(msg.value >= minAmount);
        uint moneyToReturn = msg.value - minAmount;

        if (moneyToReturn > 0)
            msg.sender.transfer(moneyToReturn);

        chits[chitKey].bidders[bidders.length] = msg.sender;
    }

}