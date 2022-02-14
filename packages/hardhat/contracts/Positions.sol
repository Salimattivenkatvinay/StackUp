// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./LoanPool.sol";


contract Position {
    uint256 reservePrice;
    // uint256 collateralAmount;
    address lpAddress;
    address participant;
    string status;
    string orderType;

    event NewExitOrder(address loanPool, address positionAddress, address participant, uint reserveprice, string status, string orderType);

    //listing the sale position
    function listforSale(address loanpoolAddress, uint256 Price) public {
        LoanPool loanPoolContract = LoanPool(loanpoolAddress);
        lpAddress = loanpoolAddress;
        participant = msg.sender;
        require(loanPoolContract.getIsparticipant(msg.sender), "you are not part of this pool");
        require(!loanPoolContract.getClaimstatus(msg.sender), "already claimed");
        reservePrice = Price;
        orderType = 'sell';
        status = 'Active';
        emit NewExitOrder(lpAddress, address(this), msg.sender, reservePrice, status, orderType);

    }

    //buying into the pool
    function buyintothePool() public {
        LoanPool loanPoolContract = LoanPool(lpAddress);
        require(!loanPoolContract.getIsparticipant(msg.sender), "you cannot buy this position as you are already part of this pool");

        bool markstatus = loanPoolContract.swapPosition(address(this));
        require(markstatus, "swap failed");
        status = 'completed';

        emit NewExitOrder(lpAddress, address(this), participant, reservePrice, status, orderType);
        //emitting updated order book with status completed
    }

    function cancelSellOrder() public {
        LoanPool loanPoolContract = LoanPool(lpAddress);
        require(loanPoolContract.getIsparticipant(msg.sender), "you cannot cancel the order");
        require(compareStrings(status, 'Active'), "you cannot cancel the non active orders");
        status = 'Cancelled';

        emit NewExitOrder(lpAddress, address(this), msg.sender, reservePrice, status, orderType);
        //emitting updated order book with status completed
    }

    function updateReservePrice(uint newReservePrice) public {
        LoanPool loanPoolContract = LoanPool(lpAddress);
        require(loanPoolContract.getIsparticipant(msg.sender), "you cannot update reserve price");
        require(compareStrings(status, 'Active'), "you cannot cancel the non active orders");
        reservePrice = newReservePrice;

        emit NewExitOrder(lpAddress, address(this), msg.sender, reservePrice, status, orderType);
        //emitting updated order book with status completed
    }

    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));

    }

    function getpositionParticipant() public view returns (address){
        return participant;
    }

    function getReservePrice() public view returns (uint256){
        return reservePrice;
    }

    function getpositionstatus() public view returns (string memory){
        return status;
    }
}