function setNavClick(view, position) {
    $(".nav-link").attr('class', 'nav-link');
    view.classList.add("active")

    if (position == 0) {
        $("#active").show()
        $("#trading").hide()
        $("#portfolio").hide()
    } else if (position == 1) {

        $("#trading").show()
        $("#active").hide()
        $("#portfolio").hide()
    } else {

        $("#portfolio").show()
        $("#trading").hide()
        $("#active").hide()
    }

}

// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

async function getBlockNumber() {
    let web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
    const latestBlockNumber = await web3.eth.getBlockNumber()
    console.log(latestBlockNumber)
    await getEthData()
    return latestBlockNumber
}

function getEthData() {
    let web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
    console.log("getEthData")
    let mycontract = new web3.eth.Contract(loanPoolFactory.abi, "0x6EE0dAD2742Debc90f651FEB3D30BDF08049203C")
    mycontract.methods.totalPools().call()
        .then(function (result) {
            console.log(result)
        });
    //
    // mycontract.getPastEvents('newPoollll', {
    //     fromBlock: 0,
    //     toBlock: 'latest'
    // }, function(error, events){ console.log(events); })
    //     .then(function(events){
    //         console.log(events) // same results as the optional callback above
    //     });
}

$(document).ready(function () {

   /* for (let i = 0; i < 7; i++) {
        $("#active_table").append(`
        <tr>
            <td>${i}</td>
            <td>${Math.pow(10, i)}</td>
            <td>${i * 10}</td>
            <td>1000</td>
            <td>01/25</td>
            <td>
                <button type="button" class="btn btn-primary">Bid</button>
            </td>
        </tr>`);
    }*/


    for (let i = 0; i < 70; i++) {
        $("#trading_table").append(`
        <tr>
            <td>${i}</td>
            <td>${Math.pow(10, i)}</td>
            <td>${i * 10}</td>
            <td>1000</td>
            <td>1000</td>
            <td class="dt-control"></td>
        </tr>`);
    }

    function format(d) {
        // `d` is the original data object for the row
        return `
        <table class="table table-dark" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
            <tr>
                <td>
                Health facot : .890
                </td>
                projected interest : 5%
                <td>
                load facot : .890
                </td>
                <td>
                <button type="button" class="btn btn-primary">buy</button>
                </td>
                <td>
                    <button type="button" class="btn btn-primary">sell</button>
                </td>
            <tr>
        </table>`;
    }

    let table = $('#trading_t').DataTable({
        "scrollX": true,
        "scrollY": $(window).height() / 2,
    });

    // Add event listener for opening and closing details
    $('#trading_t tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        console.table(row.data())

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    for (let i = 0; i < 3; i++) {
        $("#portfolio_table").append(`
        <tr>
            <td>${i}</td>
            <td>${Math.pow(10, i)}</td>
            <td>${i * 10}</td>
            <td>1000</td>
            <td>01/25</td>
            <td>
                <button type="button" class="btn btn-primary">Exit</button>
            </td>
        </tr>`);
    }

    $('#portfolio_t').DataTable({
        "scrollY": $(window).height() / 2,
        "scrollX": true
    });


    $("#active").show()
    $("#trading").hide()
    $("#portfolio").hide()
});


window.onload = function () {
    const ethereumButton = document.querySelector('.enableEthereumButton');

    ethereumButton.addEventListener('click', () => {
        if (typeof window.ethereum !== 'undefined') {
            getAccount();
        } else {
            alert('Please install MetaMask');
        }
    });
};

async function getAccount() {
    const showAccount = document.querySelector('.showAccount');
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    const account = accounts[0];
    showAccount.innerHTML = account;
    $('#enableEthereumBtn').hide()
    getBlockNumber()
}