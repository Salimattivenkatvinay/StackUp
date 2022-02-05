// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IERC20.sol";


contract LoanPool {

    IERC20 public token;
    uint256 public maxParticipants;
    uint256 public collateralAmount;
    uint256 public poolStartTimestamp;
    uint256 public totalParticipants;
    uint256 public auctionInterval;
    uint256 public auctionDuration;
    uint256 internal loanerCount;
    uint256 internal claimerCount;

    mapping(address => bool) public isParticipant;
    mapping(uint256 => address) public highestBidder;
    mapping(uint256 => uint256) public highestBidAmount;
    mapping(address => bool) public takenLoan;
    mapping(address => uint256) public loanAmount;
    mapping(address => bool) public claimedFinalYield;

    event NewParticipant(address loanPool, address participant);
    event NewBidder(
        address loanPool,
        address bidder,
        uint256 amount,
        uint256 term,
        uint256 timestamp
    );
    event ClaimedLoan(
        address loanPool,
        address claimer,
        uint256 amount,
        uint256 term
    );
    event ClaimedFinalYield(
        address loanPool,
        address participant,
        uint256 amount
    );

    constructor(
        uint256 _maximumBidAmount,
        uint256 _auctionInterval,
        uint256 _auctionDuration,
        uint256 _maxParticipants,
        address _token
    ) public {
        token = IERC20(_token);
        maxParticipants = _maxParticipants;
        auctionInterval = _auctionInterval;
        auctionDuration = _auctionDuration;

        collateralAmount = _maximumBidAmount * _maxParticipants;
        poolStartTimestamp = block.timestamp;
    }


}