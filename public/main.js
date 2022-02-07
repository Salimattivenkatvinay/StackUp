/* Moralis init code */
const serverUrl = "https://dwxhhoss5qvz.usemoralis.com:2053/server";
const appId = "7OorB7zJoEKWq8IOIYJJEcr6ESEP44aXhYNJcvgJ";
Moralis.start({serverUrl, appId});

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        user = await Moralis.authenticate({signingMessage: "Log in using Moralis"})
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

    chits.set("ChitId", 0);
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

var chitsList = [];

async function showChits() {

    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
// query.equalTo("Status", "Open");
    const results = await query.find();
// alert("Successfully retrieved " + results.length + " chits.");
// Do something with the returned Moralis.Object values
    if (results.length == 0) {
        console.log("No Chits Open, Please create one... ")
    }
    for (let i = 0; i < results.length; i++) {
        const object = results[i];
        console.log(object);
        // object.attributes["ChitId"] = object.id
        let dat = {}
        dat['ChitId'] = object.id
        dat['ChitValue'] = object.attributes['ChitValue']
        dat['ChitPeriod'] = object.attributes['ChitPeriod']
        dat['Members'] = object.attributes['Members']
        dat['Installment'] = object.attributes['Installment']
        dat['Type'] = object.attributes['Type']
        dat['Status'] = object.attributes['Status']
        chitsList[i] = dat
        console.log(chitsList[i]);
    }
    populateActiveChitsTable(chitsList)

    myPortfolio()
}

$(document).ready(function () {
    showChits()
})

async function subscribeChit() {

    let user = Moralis.User.current();
    if (!user) {
        login()
    }
    ;
    console.log("User", user);

    // = document.getElementById("chitId").value
    const Chits = Moralis.Object.extend("Chits");
    const query = new Moralis.Query(Chits);
    //get monster with id xWMyZ4YEGZ
    query.get(chitId)
        .then((chit) => {
            // The object was retrieved successfully.
            console.log(chit);
            const ChitTransactions = Moralis.Object.extend("ChitTransations");
            const orders = new ChitTransactions();
            const subscribeAmount = 5 * chit.get("ChitValue") / 1000;
            console.log(subscribeAmount);
            const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
            result = addMoney(to_address, subscribeAmount);
            if (result) {
                orders.set("ChitId", chitId);
                orders.set("Type", "Subscribe");
                orders.set("Amount", subscribeAmount);
                orders.set("Status", "Open");
                orders.set("UserId", user.get("ethAddress"));
                orders.save();

                chit.increment("Members");
                chit.save();
                alert(".5% of the chit value will be deducted as subscription amount")
            }
        }, (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        });
}

async function bidChit(bidAmount) {

    bidAmount = document.getElementById("bidAmount").value;
    // chitId = document.getElementById("chitId").value

    let user = Moralis.User.current();
    if (!user) {
        login()
    }
    ;
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
        if (object.type == 'bid') {
            //   alert(object.id + ' - ' + object);
            console.log(object);
            bids.push(object.amount);
            console.log(bids);
        }
    }
    if (bidAmount > Math.max(bids)) {
        const orders = new ChitTransactions();
        orders.set("ChitId", chitId);
        orders.set("Type", "Bid");
        orders.set("Amount", parseInt(bidAmount));
        orders.set("Status", "Sucess");
        orders.set("UserId", user.get("ethAddress"));
        orders.set("Term", term);
        orders.save();


        $("#bidding_table").append(`
          <tr>
                            <td>
                            4
                            </td>
                            <td>
                            0xdwfbgnhngbfvgdfcssfgbnhhb
                            </td>
                            <td>
                            6500
                            </td>
                            <td>
                            7:22:14 am
                            </td>
                        </tr>`);

        document.getElementById('highest_bid').innerHTML = "Highest Bid: 6500"
    }
    ;
    (error) => {
        // The object was not retrieved successfully.
        // error is a Moralis.Error with an error code and message.
    };
}

var userChitStatusMap = {}

async function myPortfolio() {

    let user = Moralis.User.current();
    if (!user) {
        login()
    }
    ;
    console.log("User", user);

    const ChitTransactions = Moralis.Object.extend("ChitTransations");
    const query = new Moralis.Query(ChitTransactions);
    query.equalTo("UserId", user.get("ethAddress"));
    query.descending("createdAt");
    const results = await query.find();

    // alert("Successfully retrieved " + results.length + " chits.");
    // Do something with the returned Moralis.Object values
    if (results.length == 0) {
        console.log("No Chits, Please subscribe to one... ")
    }
    // for (let i = 0; i < results.length; i++) {
    // const object = results[i];
    // //   alert(object.id + ' - ' + object);
    // console.log(object.attributes);
    // }
    console.log("myPortfolio: ")
    console.log(results)

    for (let i = 0; i < results.length; i++) {
        const object = results[i];
        console.log(object);
        let dat = object.attributes
        if (userChitStatusMap.hasOwnProperty(dat['ChitId'])) {

        } else {
            userChitStatusMap[dat['ChitId']] = dat['Type']
        }
    }

    let usersChitList = chitsList.filter(function (chit) {
        return userChitStatusMap.hasOwnProperty(chit['ChitId'])
    })

    populatePortfolioChitsTable(usersChitList)
}


async function depositCollateral() {

    let user = Moralis.User.current();
    if (!user) {
        login()
    }
    ;
    console.log("User", user);

    // chitId = document.getElementById("chitId").value
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
            if (results.length == 0) {
                console.log("No Chits, Please subscribe to one... ")
            }
            for (let i = 0; i < results.length; i++) {
                const object = results[i];
            }
            console.log(results);
            const collateralAmount = 12 * chit.get("ChitValue") / 100;
            console.log(collateralAmount);
            const to_address = "0xdd59a4141cea60f2bf400308896c61c48e9c41e0";
            result = addMoney(to_address, collateralAmount);
            if (result) {
                const orders = new ChitTransactions();
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
    if (!user) {
        login()
    }
    ;
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
            if (results.length == 0) {
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
            if (result) {
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
    if (!user) {
        login()
    }
    ;
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
// document.getElementById("btn-show-chits").onclick = showChits;
document.getElementById("btn-my-portfolio").onclick = myPortfolio;
document.getElementById("btn-add-installment").onclick = addInstallment;
document.getElementById("btn-get-jackpot").onclick = getJackPot;

var chitId = ""

function populateActiveChitsTable(chits) {

    console.table(chits);

    for (let i = 0; i < chits.length; i++) {

        let chitData = chits[i];
        chitId = chitData["ChitId"];
        $("#active_table").append(`
      <tr id="fregt">
          <td>${chitData["ChitId"]}</td>
          <td>${parseInt(chitData["Installment"]) * parseInt(chitData["Members"])}</td>
          <td>${parseInt(chitData["ChitPeriod"]).toString() + 'months'}</td>
          <td>${chitData["Installment"]}</td>
          <td>${parseInt(chitData["Members"])}</td>
          <td>${chitData["Status"]}</td>
          <td>
              <button type="button" class="btn btn-primary" onclick="subscribeChit()">Subscribe</button>
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


function populatePortfolioChitsTable(chits) {

    console.table(chits);
    for (let i = 0; i < chits.length; i++) {
        let chitData = chits[i];
        chitId = chitData["ChitId"];

        let btntext = "";
        switch (userChitStatusMap[chitId]) {
            case "Subscribe" :
                btntext = "Bid";
                break;
            case "Bid" :
                btntext = "Add collateral";
                break;
            case "Collateral" :
                btntext = "Claim Jackpot"
            case "JackPot" :
                btntext = "Installment";
                break;
            case "Installment" :
                btntext = "Bid";
                break;
            default :
                btntext = "view chit"
        }
        $("#portfolio_table").append(`
        <tr>
           <td>Ox1..</td>
          <td>${parseInt(chitData["Installment"]) * parseInt(chitData["Members"])}</td>
          <td>${parseInt(chitData["ChitPeriod"]).toString() + 'months'}</td>
          <td>${chitData["Installment"]}</td>
          <td>${parseInt(chitData["Members"])}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick=chitUserAction(chitId)>${btntext}</button>
            </td>
        </tr>`);
    }

    $('#portfolio_t').DataTable({
        "scrollY": $(window).height() / 2,
        "scrollX": true
    });
}

function chitUserAction(chitId) {

    switch (userChitStatusMap[chitId]) {
        case "Subscribe" :
            populatePortfolioDetBid(chitId)
            break;
        case "Bid" :
            depositCollateral()
            break;
        case "Deposit" :
            break;
        case "Installment" :
            break;
        default :
    }
}


function populatePortfolioDetBid(chitId) {
    $('#portfolio_t_det').empty()
        .show().append(
        `
            <div class="row">
            <div class="col-12">
                 <button class="btn btn-danger offset-11" onclick="$('#portfolio_t_det').hide()"> close </button>
                <h4 id="highest_bid" class="mt-3"> Highest Bid: 6300</h4>
                <h3 id="bid_timer" class="mt-3"> Remaining time : </h3>
            </div>
            <div class="col-12">
                <table class="table table-dark mt-5" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
                       <tbody id="bidding_table" >
                        <tr>
                            <td>
                            1
                            </td>
                            <td>
                            0xdwfegrhtjykuwfegbhvbdfnmynebhwgf
                            </td>
                            <td>
                            5000
                            </td>
                            <td>
                            7:20:01 am
                            </td>
                        </tr>
                         <tr>
                            <td>
                            2
                            </td>
                            <td>
                            0xdwegrhetjrsyjnhtgrefwegrhttjym
                            </td>
                            <td>
                            6000
                            </td>
                            <td>
                            7:20:33 am
                            </td>
                        </tr>
                         <tr>
                            <td>
                            3
                            </td>
                            <td>
                            0xdwffegvbhtnjnhbgrfedwfghnjhgfgv
                            </td>
                            <td>
                            6300
                            </td>
                            <td>
                            7:21:57 am
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
            
            <div id="bid_input">
            <input type="number" id="bidAmount"> <button class="btn btn-dark" onclick=bidChit()> Place</button>
            </div>
            </div>`
    )

    var fiveMinutes = 60 * .25;

    var timer = fiveMinutes, minutes, seconds;
    let tim = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById('bid_timer').innerHTML = "Remaining time:" + minutes + ":" + seconds

        if (--timer < 0) {
            console.log("stopped")
            clearInterval(tim)
            $("#bid_input").hide();
            $("#bid_timer").hide();
            // timer = duration;
            alert("Yay!! you have won the bid")
        }
    }, 1000);
}
