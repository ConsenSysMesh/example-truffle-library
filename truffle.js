// This is a bit unruly, and needs to be put in its own package.
// But all this preamble tells Truffle how to sign transactions on
// its own from a bip39 mnemonic (which creates addresses and private keys).
// This allows Truffle deployment to work with infura. Note we do
// this specifically when deploying to the morden network.

var hdkey = require('ethereumjs-wallet/hdkey');
var bip39 = require("bip39");
var ProviderEngine = require("web3-provider-engine");
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js');
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js");
var Web3 = require("web3");
var fs = require("fs");
var path = require("path")

// Read the mnemonic from a file that's not committed to github, for security.
var mnemonic = fs.readFileSync(path.join(__dirname, "deploy_mnemonic.key"), {encoding: "utf8"}).trim();

var wallet_hdpath = "m/44'/60'/0'/0/";
var hd = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic));

// Get the first account
var account = hd.derivePath(wallet_hdpath + "0")
var wallet = account.getWallet();
var address = "0x" + wallet.getAddress().toString("hex");

var providerUrl = "https://morden.infura.io:8545";

var engine = new ProviderEngine();
engine.addProvider(new WalletSubprovider(wallet, {}));
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)));
engine.start(engine);

module.exports = {
  // Specifically for morden
  networks: {
    morden: {
      network_id: 2,
      provider: engine,
      from: address
    }
  },
  // Default configuration
  rpc: {
    host: "localhost",
    port: 8545
  }
};
