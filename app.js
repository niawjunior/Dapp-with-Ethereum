if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

var EthereumContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"_fName","type":"string"},{"name":"_age","type":"uint256"}],"name":"setInstructor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getInstructor","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]);

var ethereum = EthereumContract.at('0xc3b1a5064c55e6cfbe548918e95afa04b1378db0');

ethereum.getInstructor((error, result) => {
  if (!error) {
      $("#instructor").html(result[0]+' ('+result[1]+' ปี)');
  } else
       console.log(error);
});

document.querySelector('#submit').addEventListener('submit', (e) => {
  e.preventDefault();
  ethereum.setInstructor($("#name").val(), $("#age").val());
  window.location = 'index.html';
});