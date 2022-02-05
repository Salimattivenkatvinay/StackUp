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
        uint8 maxParticipants,
        address tokenAddress,
        address creator,
        uint256 createdAt
    );

    function addLoanPool(
        uint256 bidAmount, // 1,00,000 every month
        uint256 auctionInterval, // every month
        uint8 maxParticipants, //10 people
        address token
    ) public {

        LoanPool newLoanPool = new LoanPool(
            bidAmount,
            auctionInterval,
            maxParticipants,
            token
        );

        address loanPool = address(newLoanPool);

        totalPools++;

        emit NewLoanPool(
            totalPools,
            loanPool,
            bidAmount,
            auctionInterval,
            maxParticipants,
            token,
            msg.sender,
            block.timestamp
        );
    }

}