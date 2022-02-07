// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IERC20.sol";
import "./Positions.sol";


contract LoanPool {

    IERC20 public token;
    uint256 public maxParticipants;
    uint256 public collateralAmount; // 1,20,000
    uint256 public installmentAmount; // 10,000
    uint256 public poolStartTimestamp;
    uint256 public totalParticipants; // total participants.
    uint256 public auctionInterval; // gap bw wach auction. 1 month
    uint256 public auctionDuration; // how much time aution should happen : 1hr
    uint256 internal loanerCount; //
    uint256 internal claimerCount;
    //
    //    struct installment{
    //        uint term;
    //        uint256 termAmount;
    //    }

    mapping(address => uint) userTermCount;

    mapping(address => bool) public isParticipant;
    mapping(uint256 => address) public highestBidder;
    mapping(uint256 => uint256) public highestBidAmount;
    mapping(address => bool) public takenLoan;
    mapping(address => uint256) public loanAmount;
    mapping(address => bool) public claimedFinalYield;

    mapping(address => uint256) public collateralDeposited;

    enum TransactionType{subscribe, bid, installment, collateral, jackpot, position}

    event PoolTransactions(
        address chitId,
        address userId,
        string transactionType,
        string status,
        string ttype,
        uint256 term,
        uint256 amount
    );

    constructor(
        uint256 _installmentAmount, // 1,00,000 every month per user
        uint256 _auctionInterval,
        uint256 _auctionDuration,
        uint256 _maxParticipants,
        address _token
    ) {
        token = IERC20(_token);
        maxParticipants = _maxParticipants;
        auctionInterval = _auctionInterval;
        auctionDuration = _auctionDuration;
        installmentAmount = _installmentAmount;
        collateralAmount = (_installmentAmount * _maxParticipants);
        //        collateralAmount = (12 * _installmentAmount * _maxParticipants) / 10;
        poolStartTimestamp = block.timestamp;
    }

    function subscribe() public {
        require(
            totalParticipants + 1 <= maxParticipants,
            "Exceeds maximum number of participants !!"
        );
        require(
            !isParticipant[msg.sender],
            "You have already participated in the pool !!"
        );
        uint minAmount = (collateralAmount / maxParticipants / 50) * 10 ** token.decimals();
        // 2% of  collateral amount

        require(
            token.transferFrom(
                msg.sender,
                address(this),
                minAmount
            ),
            "ERC20: transferFrom failed !!"
        );

        isParticipant[msg.sender] = true;
        totalParticipants++;
        if (totalParticipants >= maxParticipants)
            poolStartTimestamp = block.timestamp;
        emit PoolTransactions(address(this), msg.sender, "subscribe", "success", "debit", 0, minAmount);
    }


    function addInstallment() public {
        require(
            isParticipant[msg.sender],
            "not in pool!!"
        );

        require(userTermCount[msg.sender] < getAuctionCount(), "already installment paid");

        uint256 termInstallmentAmount = ((installmentAmount - highestBidAmount[getAuctionCount()] / maxParticipants) * 10 ** token.decimals());

        require(
            token.transferFrom(
                msg.sender,
                address(this),
                termInstallmentAmount
            ),
            "ERC20: transferFrom failed !!"
        );

        userTermCount[msg.sender] = getAuctionCount();
        emit PoolTransactions(address(this), msg.sender, "installment", "success", "debit", getAuctionCount(), termInstallmentAmount);
    }

    function depositCollateral() public {
        require(collateralDeposited[msg.sender] == 0, "already done bro");
        require(isParticipant[msg.sender], "not a participant");
        uint256 term = getAuctionCount();
        uint256 collateralDeposit = (collateralAmount - (term / totalParticipants) * collateralAmount);
        require(
            deposit(collateralDeposit * 10 ** token.decimals()), //required collateral decreases
            "Depositing on lending pool failed !!"
        );
        collateralDeposited[msg.sender] = collateralDeposit;
        emit PoolTransactions(address(this), msg.sender, "collateral", "success", "debit", getAuctionCount(), collateralDeposit);
    }

    function bid(uint256 bidAmount) public {
        require(
            block.timestamp < poolCloseTimestamp(),
            "All auction already complete !!"
        );
        require(
            block.timestamp >= nextAutionStartTimestamp() &&
            block.timestamp <= nextAutionCloseTimestamp(),
            "Auction for this term is over !!"
        );
        require(
            isParticipant[msg.sender],
            "You are not a participant of this pool"
        );
        require(!takenLoan[msg.sender], "You have already taken a loan !!");
        // he already took a big in some month before

        require(bidAmount > highestBidAmount[getAuctionCount()],
            "Bid Amount must be greater than current bid amount and min bid amount !!"
        );

        highestBidAmount[getAuctionCount()] = bidAmount;
        highestBidder[getAuctionCount()] = msg.sender;

        loanAmount[msg.sender] = collateralAmount - bidAmount;

        emit PoolTransactions(address(this), msg.sender, "bid", "success", "debit", getAuctionCount(), bidAmount);
    }

    function claimLoan() public {
        (bool isWinner, uint256 term) = checkWinnerStatus(msg.sender);

        require(isWinner, "You are not the highest bidder !!");

        //        if (term < totalParticipants - 1) {
        //            require(
        //                term < getAuctionCount(),
        //                "Can't claim loan during the auction !!"
        //            );
        //        } else if (term >= totalParticipants) {
        require(
            block.timestamp > nextAutionCloseTimestamp(),
            "Can't claim loan during the auction !!"
        );
        //        }

        require(collateralDeposited[msg.sender] > 0, "deposit collateral man!!");

        require(
            withdraw(loanAmount[msg.sender] * 10 ** token.decimals()),
            "Withdrawl from lending pool failed !!"
        );

        takenLoan[msg.sender] = true;
        loanerCount++;
        emit PoolTransactions(address(this), msg.sender, "jackpot", "success", "credit", getAuctionCount(), loanAmount[msg.sender]);
    }

    function claimFinalYield() public {
        require(
            block.timestamp > poolCloseTimestamp(),
            "Pool is still active !!"
        );
        require(
            isParticipant[msg.sender],
            "You are not a participant of this pool"
        );

        uint256 returnAmount = finalReturnAmount();

        claimerCount++;
        claimedFinalYield[msg.sender] = true;

        if (takenLoan[msg.sender]) {
            loanerCount--;
        }

        require(
            withdraw(returnAmount),
            "WithDrawl from lending pool failed !!"
        );

        emit PoolTransactions(address(this), msg.sender, "collateral", "success", "credit", getAuctionCount(), returnAmount);
    }

    function finalReturnAmount() internal view returns (uint256) {
        uint minAmount = (collateralAmount / maxParticipants / 50) * 10 ** token.decimals();
        return collateralDeposited[msg.sender] + minAmount;
        // + some yeild. need to think about this.
    }

    function checkWinnerStatus(address account)
    public
    view
    returns (bool, uint256)
    {
        bool result;
        uint256 term;

        for (uint256 i = 1; i <= getAuctionCount() + 1; i++) {
            if (highestBidder[i] == account) {
                result = true;
                term = i;
            }
        }

        return (result, term);
    }

    function getAuctionCount() public view returns (uint256) {
        uint256 term = ((block.timestamp - poolStartTimestamp) / ((auctionInterval))) + 1;

        if (term >= totalParticipants) {
            term = totalParticipants - 1;
        }

        return term;
    }

    function nextAutionStartTimestamp() public view returns (uint256) {
        uint256 result;

        if (block.timestamp < poolCloseTimestamp() && totalParticipants > 1) {
            result =
            poolStartTimestamp +
            ((getAuctionCount() - 1) * auctionInterval);
        }

        return result;
    }

    function nextAutionCloseTimestamp() public view returns (uint256) {
        uint256 result;

        if (block.timestamp < poolCloseTimestamp() && totalParticipants > 1) {
            result = nextAutionStartTimestamp() + auctionDuration;
        }

        return result;
    }

    function poolCloseTimestamp() public view returns (uint256) {
        return
        poolStartTimestamp +
        ((
        totalParticipants > 1
        ? totalParticipants - 1
        : totalParticipants
        ) *
        auctionInterval *
        1 hours);
    }

    function withdraw(uint256 amount) private returns (bool){
        return token.transfer(
            msg.sender,
            amount
        );
    }

    function deposit(uint256 amount) private returns (bool){
        return token.transferFrom(
            msg.sender,
            address(this),
            amount
        );
    }

    function getPoolBalance() public view returns (uint256){
        return token.balanceOf(address(this));
    }

    function getIsparticipant(address paricipant) public view returns(bool){
        return isParticipant[paricipant];
    }
    function getClaimstatus(address paricipant) public view returns(bool){
        return claimedFinalYield[paricipant];
    }
    function setIsparticipant(address paricipant,bool status) private {
        isParticipant[paricipant]=status;
    }

    function swapPosition(address positionAddress) public returns(bool) {
        Position PositionContract =Position(positionAddress);
        require(!getIsparticipant(msg.sender),"you cannot swap this position as you are already part of this pool");
        require(PositionContract.compareStrings(PositionContract.getpositionstatus(),'Active'),"you cannot swap this position as this is inactive position");
        // uint256 collateralAmounttobepaid=PositionContract.getcollateralamount;
        // deposit(PositionContract.getcollateralamount());
        bool returnToposition= token.transferFrom(msg.sender,PositionContract.getpositionParticipant(),PositionContract.getReservePrice());
        // withdraw(PositionContract.getpositionParticipant(),PositionContract.getcollateralamount());
        setIsparticipant(PositionContract.getpositionParticipant(),false);
        setIsparticipant(msg.sender,true);
        return returnToposition;
    }

}