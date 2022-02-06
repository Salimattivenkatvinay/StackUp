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

    console.log("show chits called")

    const Chits = Moralis.Object.extend("newPoollll");
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
            orders.set("ChitId", chitId);
            orders.set("Type", "Subscribe");
            orders.set("Amount", 0.05*chit.ChitValue);
            orders.set("Status", "Open");
            orders.set("UserId", user.get("ethAddress"));
            orders.set("Stage", "Subscribe");
            orders.save();

            chit.increment("Members");
            chit.save();
        }, (error) => {
            // The object was not retrieved successfully.
            // error is a Moralis.Error with an error code and message.
        });
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
//
// document.getElementById("btn-login").onclick = login;
// document.getElementById("btn-logout").onclick = logOut;
// document.getElementById("btn-create-chit").onclick = createChit;
// document.getElementById("btn-show-chits").onclick = showChits;
// document.getElementById("btn-my-portfolio").onclick = myPortfolio;
