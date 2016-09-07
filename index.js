// This simple library abstracts out all of Ethereum, using
// Infura to get network data, making this very accessible
// to other JS projects.

var SimpleNameRegistry = require("./build/contracts/SimpleNameRegistry.sol.js");

var Web3 = require("web3");
var provider = new Web3.providers.HttpProvider("https://morden.infura.io:8545/")
var web3 = new Web3(provider);

SimpleNameRegistry.setProvider(provider);
SimpleNameRegistry.setNetwork(2); // Enforce morden

module.exports = {
  get: function(name, callback) {
    SimpleNameRegistry.deployed().names.call(name).then(function(address) {
      callback(null, address);
    }).catch(callback);
  }
}
