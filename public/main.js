/* TODO: Add Moralis init code */

/* Moralis init code */
const serverUrl = "https://dwxhhoss5qvz.usemoralis.com:2053/server";
const appId = "7OorB7zJoEKWq8IOIYJJEcr6ESEP44aXhYNJcvgJ";
Moralis.start({serverUrl, appId});

/* TODO: Add Moralis Authentication code */

/* Authentication code */
async function login() {
    let user = Moralis.User.current();
    if (!user) {
        await Moralis.authenticate({signingMessage: "Log in using Moralis"})
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

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;