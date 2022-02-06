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
    let mycontract = new web3.eth.Contract(stackUpFactoryAbi.abi, "0xa7bA5b6c56578f4F7b15a231b0c5BfDA52c0bE07")
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


function populatePortfolioDetBid() {
    $('#portfolio_t_det').empty()
        .show().append(
        `
            <div class="row">
            <div class="col-12">
                 <button class="btn btn-danger offset-11" onclick="$('#portfolio_t_det').hide()"> close </button>
                <h4 class="mt-3"> Highest Bid: 2500</h4>
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
                            0xdwfegrhtjykuwfegbh
                            </td>
                            <td>
                            $890
                            </td>
                            <td>
                            12:01:01 pm
                            </td>
                        </tr>
                         <tr>
                            <td>
                            1
                            </td>
                            <td>
                            0xdwfegrhtjykuwfegbh
                            </td>
                            <td>
                            $890
                            </td>
                            <td>
                            12:01:01 pm
                            </td>
                        </tr>
                         <tr>
                            <td>
                            1
                            </td>
                            <td>
                            0xdwfegrhtjykuwfegbh
                            </td>
                            <td>
                            $890
                            </td>
                            <td>
                            12:01:01 pm
                            </td>
                        </tr>
                        </tbody>
                    </table>
            </div>
            
            <div id="bid_input">
            <input type="number" id="bit_amount"> <button class="btn btn-dark" onclick=placeNewBid()> Place</button>
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
        }
    }, 1000);
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
        let btntext = "";
        if (false) btntext = "bid"; else btntext = "claim";
        $("#portfolio_table").append(`
        <tr>
            <td>${i}</td>
            <td>${Math.pow(10, i)}</td>
            <td>${i * 10}</td>
            <td>1000</td>
            <td>01/25</td>
            <td>
                <button type="button" class="btn btn-primary" onclick=populatePortfolioDetBid()>${btntext}</button>
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


function placeNewBid() {


    $("#bidding_table").append(`
          <tr>
                            <td>
                            1
                            </td>
                            <td>
                            0xdwfegrhtjykuwfegbh
                            </td>
                            <td>
                            $890
                            </td>
                            <td>
                            12:01:01 pm
                            </td>
                        </tr>`);
}