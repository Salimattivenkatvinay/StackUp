// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./LoanPool.sol";
import "./Owner.sol";

contract StackUpFactory is Owner {

    uint256 public totalPools;
    address mUsd = 0x7eA390E330EDee6Fe43abadbA510C952eF98f690;

    event NewLoanPool(
        uint256 id,//serial number
        address loanPool,//chit contract
        uint256 indexed installmentAmount,//monthly amount to be paid
        uint256 auctionInterval,// 30 days in seconds
        uint8 maxParticipants,
        address tokenAddress,// USDT or some other token, rupess or anything.
        address creator,// who created this chit
        string status // open or closed.
    );

    function addLoanPool(
        uint256 installmentAmount, // 1,00,000 every month
        uint256 auctionInterval, // every month
        uint256 auctionDuration, // how much aution should be op[en : maybe or 10 mins:
        uint8 maxParticipants, //10 people
        address token // rupee or usd
    ) public {

        LoanPool newLoanPool = new LoanPool(
            installmentAmount,
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
            bidAmount,
            auctionInterval,
            maxParticipants,
            token,
            msg.sender,
            "OPEN"
        );
    }

}