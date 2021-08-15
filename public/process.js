$(document).ready(function(){
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_ban_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "DangKy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrHocvien",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const addressSM = "0x898198bA0cfb4B5F0997E87B36c0823782eF828d";

    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();

    // tao contract cho Metamask
    var contract_MM = new web3.eth.Contract(abi, addressSM);
    console.log(contract_MM);

    // tao contract cho Infura
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/91db2cf88c9b41149d6063f22f087100");
    var web3_infura = new Web3(provider);
    var contract_Infura = web3_infura.eth.Contract(abi, addressSM);
    console.log(contract_Infura);
    contract_Infura.events.SM_ban_data({filter: {}, fromBlock: "latest"}, function(error, data){
        if(error){
            console.log(error);
        }else {
            console.log(data);
            $("#tbDS").append(`
                <tr id="dong1">
                    <td>` + data.returnValues[0] + `</td>
                    <td>`+ data.returnValues[1] + `</td>
                </tr>
            `);
        }
    });

    var currentAccount = "";
    checkMM();

    $("#connectMM").click(function(){
        connectMM().then((data) => {
            currentAccount = data[0];
            console.log(currentAccount);
        }).catch((err) => {
            console.log(err);
        });
    });

    $("#btnDangKy").click(function(){
        if(currentAccount.length == 0){
            alert("Vui long dang nhap Meta mask nha!");
        }
        else {
            $.post("./dangky", {
                Email: $("#txtEmail").val(),
                HoTen: $("#txtHoten").val(),
                SoDT: $("#txtSoDT").val()
            }, function(data) {
                if(data.ketqua == 1){
                    // data.maloi._id
                    contract_MM.methods.DangKy(data.maloi._id).send({
                        from: currentAccount
                    });
                }
            });
        }
    });

    
});

async function connectMM(){
    const accounts = await ethereum.request({method: 'eth_requestAccounts'});
    return accounts;
}

function checkMM() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
    }
    else {
        console.log("Metamask not installed");
    }
}