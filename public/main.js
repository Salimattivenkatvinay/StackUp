/* Moralis init code */
const serverUrl = "https://dwxhhoss5qvz.usemoralis.com:2053/server";
const appId = "7OorB7zJoEKWq8IOIYJJEcr6ESEP44aXhYNJcvgJ";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({ signingMessage: "Log in using Moralis" })
            .then(function (user) {
                console.log("logged in user:", user);
                console.log(user.get("ethAddress"));
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}


async function createChit() {
    const Chits = Moralis.Object.extend("Chits");
    const chits = new Chits();

    chits.set("ChitValue", 100000);
    chits.set("ChitPeriod", 10);
    chits.set("Members", 10);
    chits.set("Installment", 10000);
    chits.set("Type", "CollateralFirst");
    chits.set("Status", "Open");

    chits.save()
        .then((chits) => {
            // Execute any logic that should take place after the object is saved.
            alert('New Chit object created with objectId: ' + chits.id);
        }, (error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Moralis.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        });
}


async function showChits() {

    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
// query.equalTo("Status", "Open");
    const results = await query.find();
// alert("Successfully retrieved " + results.length + " chits.");
// Do something with the returned Moralis.Object values
    if (results.length==0){
        console.log("No Chits Open, Please create one... ")
    }
    for (let i = 0; i < results.length; i++) {
        const object = results[i];
//   alert(object.id + ' - ' + object);
        console.log(object);
    }
}

$(document).ready(function () {
    showChits()
})

async function subscribeChit() {

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    chitId = document.getElementById("chitId").value
    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    query.get(chitId)
        .then((chit) => {
            // The object was retrieved successfully.
            console.log(chit);
            const ChitTransactions = Moralis.Object.extend("ChitTransations");
            const orders = new ChitTransactions();
            const subscribeAmount = 5*chit.get("ChitValue")/100;
            console.log(subscribeAmount);
            const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
            result = addMoney(to_address, subscribeAmount);
            if (result){
                orders.set("ChitId", chitId);
                orders.set("Type", "Subscribe");
                orders.set("Amount", subscribeAmount);
                orders.set("Status", "Open");
                orders.set("UserId", user.get("ethAddress"));
                orders.save();

                chit.increment("Members");
                chit.save();
            }
        }, (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        });
}

async function bidChit(bidAmount) {

    bidAmount = document.getElementById("bidAmount").value;
    chitId = document.getElementById("chitId").value

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    let chit = await query.get(chitId)
    // The object was retrieved successfully.
    console.log(chit);
    term = monthDiff(chit.createdAt, new Date());

    const ChitTransactions = Moralis.Object.extend("ChitTransations");
    const query1 = new Moralis.Query(ChitTransactions);
    query.equalTo("UserId", user.get("ethAddress"));
    query.equalTo("chitId", chitId);
    const chit_orders = await query1.find();
    console.log("Bid :", chit_orders)

    let bids = [];
    for (let i = 0; i < chit_orders.length; i++) {
        const object = chit_orders[i];
        if (object.type =='bid'){
            //   alert(object.id + ' - ' + object);
            console.log(object);
            bids.push(object.amount);
            console.log(bids);
        }}
    if (bidAmount > Math.max(bids)){
        const orders = new ChitTransactions();
        orders.set("ChitId", chitId);
        orders.set("Type", "Bid");
        orders.set("Amount", parseInt(bidAmount));
        orders.set("Status", "Sucess");
        orders.set("UserId", user.get("ethAddress"));
        orders.set("Term", term);
        orders.save();
    };
    (error) => {
        // The object was not retrieved successfully.
        // error is a Moralis.Error with an error code and message.
    };
}


async function myPortfolio() {

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    const ChitTransactions = Moralis.Object.extend("ChitTransations");
    const query = new Moralis.Query(ChitTransactions);
    query.equalTo("UserId", user.get("ethAddress"));
    const results = await query.find();
    // alert("Successfully retrieved " + results.length + " chits.");
    // Do something with the returned Moralis.Object values
    if (results.length==0){
        console.log("No Chits, Please subscribe to one... ")
    }
    // for (let i = 0; i < results.length; i++) {
    // const object = results[i];
    // //   alert(object.id + ' - ' + object);
    // console.log(object.attributes);
    // }
    console.log(results);

}


async function depositCollateral() {

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    chitId = document.getElementById("chitId").value
    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    query.get(chitId)
        .then((chit) => {
            // The object was retrieved successfully.
            console.log(chit);
            term = monthDiff(chit.createdAt, new Date());

            const ChitTransactions = Moralis.Object.extend("ChitTransations");
            const query = new Moralis.Query(ChitTransactions);
            query.equalTo("UserId", user.get("ethAddress"));
            const results = query.find();
            // alert("Successfully retrieved " + results.length + " chits.");
            // Do something with the returned Moralis.Object values
            if (results.length==0){
                console.log("No Chits, Please subscribe to one... ")
            }
            for (let i = 0; i < results.length; i++) {
                const object = results[i];
            }
            console.log(results);
            const collateralAmount = 12*chit.get("ChitValue")/10;
            console.log(collateralAmount);
            const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
            result = addMoney(to_address, collateralAmount);
            if (result){
                orders.set("ChitId", chitId);
                orders.set("Type", "Collateral");
                orders.set("Amount", collateralAmount);
                orders.set("Status", "Open");
                orders.set("UserId", user.get("ethAddress"));
                orders.set("Term", term);
                orders.save();
            }
        }, (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        });
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

async function addInstallment() {

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    chitId = document.getElementById("chitId").value
    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    query.get(chitId)
        .then((chit) => {
            // The object was retrieved successfully.
            console.log(chit);
            term = monthDiff(chit.createdAt, new Date());

            const ChitTransactions = Moralis.Object.extend("ChitTransations");
            const query = new Moralis.Query(ChitTransactions);
            query.equalTo("UserId", user.get("ethAddress"));
            const results = query.find();
            // alert("Successfully retrieved " + results.length + " chits.");
            // Do something with the returned Moralis.Object values
            if (results.length==0){
                console.log("No Chits, Please subscribe to one... ")
            }
            for (let i = 0; i < results.length; i++) {
                const object = results[i];
            }
            console.log(results);
            const installmentAmount = chit.get("ChitValue") / chit.get("Members");
            console.log(installmentAmount);
            const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
            result = addMoney(to_address, installmentAmount);
            if (result){
                orders.set("ChitId", chitId);
                orders.set("Type", "Installment");
                orders.set("Amount", installmentAmount);
                orders.set("Status", "Open");
                orders.set("UserId", user.get("ethAddress"));
                orders.set("Term", term);
                orders.save();
            }
        }, (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        });
}

async function getJackPot() {

    let user = Moralis.User.current();
    if (!user) { login()};
    console.log("User", user);

    chitId = document.getElementById("chitId").value
    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    chit = await query.get(chitId)
    // The object was retrieved successfully.
    console.log(chit);
    term = monthDiff(chit.createdAt, new Date());

    const ChitTransactions = Moralis.Object.extend("ChitTransations");
    const query1 = new Moralis.Query(ChitTransactions);
    query.equalTo("UserId", user.get("ethAddress"));
    query.equalTo("chitId", chitId);
    query.descending("term");
    const results = await query1.first();
    console.log(results);
    // // const jackPotAmount = results
    // console.log(collateralAmount);
    // const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
    // result = addMoney(to_address, installmentAmount);
    // if (result){
    //     orders.set("ChitId", chitId);
    //     orders.set("Type", "Installment");
    //     orders.set("Amount", installmentAmount);
    //     orders.set("Status", "Open");
    //     orders.set("UserId", user.get("ethAddress"));
    //     orders.set("Term", term);
    //     orders.save();
    // }
    // }, (error) => {
    // // The object was not retrieved successfully.
    // // error is a Moralis.Error with an error code and message.
    // });
};

async function sendMoney() {

    // sending 0.5 tokens with 18 decimals
    const options = {
        type: "erc20",
        amount: Moralis.Units.Token("0.5", "18"),
        receiver: "0xdd59a4141cea60f2bf400308896c61c48e9c41e0",
        contractAddress: "0x3B74cEc6d144958766b9FE7075FD37296d343095"
    }
    let result = await Moralis.transfer(options)
}

Moralis.enableWeb3()
async function addMoney(to_address, amount) {

    // sending 0.5 tokens with 18 decimals
    const options = {
        type: "erc20",
        amount: Moralis.Units.Token(amount.toString(), "18"),
        receiver: to_address,
        contractAddress: "0x3B74cEc6d144958766b9FE7075FD37296d343095"
    }
    let result = await Moralis.transfer(options)
}


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-create-chit").onclick = createChit;
document.getElementById("btn-bid-chit").onclick = bidChit;
document.getElementById("btn-show-chits").onclick = showChits;
document.getElementById("btn-my-portfolio").onclick = myPortfolio;
document.getElementById("btn-add-installment").onclick = addInstallment;
document.getElementById("btn-get-jackpot").onclick = getJackPot;


function populateActiveChitsTable(chits) {

    console.table(chits);

    for (let i = 0; i < chits.length; i++) {
        let chitData = chits[i];
        $("#active_table").append(`
      <tr id="fregt">
          <td>${chitData["loanPool"]}</td>
          <td>${parseInt(chitData["installmentAmount"]) * parseInt(chitData["maxParticipants"])}</td>
          <td>${(parseInt(chitData["maxParticipants"]) * parseInt(chitData["auctionInterval"]).toString() + 's')}</td>
          <td>${chitData["installmentAmount"]}</td>
          <td>${parseInt(chitData["maxParticipants"])}</td>
          <td>${chitData["status"]}</td>
          <td>
              <button id=${i} type="button" class="btn btn-primary" onclick="placeBid(${chitData["loanPool"]})">Subscribe</button>
          </td>
      </tr>`);
    }

    // <button id=${i} type="button" class="btn btn-primary" data-bs-id=${i.toString()} data-bs-toggle="modal" data-bs-target="#exampleModalCenter">Subscribe</button>

    // $(document).on("click", ".open-AddBookDialog", function () {
    //     console.log($(event.target).closest('button')[0].id)
    //     let getIdFromRow = $(event.target).closest('button')[0].id;
    //     console.log(getIdFromRow)
    //     //make your ajax call populate items or what even you need
    //     $(this).find('#orderDetails').html($(`
    //     <b> 5% of your installment will be deducted as subscription fee, which is completely refundable at the end.</b>`
    //     ))
    // });
}