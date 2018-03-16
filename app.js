if (typeof web3 !== "undefined") {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var EthereumContract = web3.eth.contract([
  {
    constant: true,
    inputs: [],
    name: "getInstructor",
    outputs: [
      {
        name: "",
        type: "string"
      },
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "name",
        type: "string"
      },
      {
        indexed: false,
        name: "age",
        type: "uint256"
      }
    ],
    name: "Instructor",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_fName",
        type: "string"
      },
      {
        name: "_age",
        type: "uint256"
      }
    ],
    name: "setInstructor",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
]);

var ethereum = EthereumContract.at(
  "0xf31ebd0886341ce420bb3c8404d114ef13617ebe"
);

var instructorEvent = ethereum.Instructor();

instructorEvent.watch((error, result) => {
  if (!error) {
    $("#loader").hide();
    $("#instructor").html(result.args.name + " (" + result.args.age + " ปี )");
  } else {
    $("#loader").hide();
    console.log(error);
  }
});

document.querySelector("#submit").addEventListener("submit", e => {
  $("#loader").show();
  e.preventDefault();
  ethereum.setInstructor($("#name").val(), $("#age").val());
});
