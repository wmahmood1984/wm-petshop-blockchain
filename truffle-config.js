const path = require("path");

const HDWalletProvider = require("@truffle/hdwallet-provider")
const infuraKey = "5c4e99b87158485fa1f67aea4a62575e"

const fs = require('fs')
const mnemonic = fs.readFileSync(".secret").toString().trim();





module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "front-end/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    ropsten: {
          provider: function() {
            return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraKey}`);
          },
          network_id: '3',
          //networkCheckTimeout:false,
          skipDryRun: true,
          // timeoutBlocks: 10000
        },
    
  }
  // networks: {
  //   ropsten: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic1, "https://ropsten.infura.io/v3/5c4e99b87158485fa1f67aea4a62575e");
  //     },
  //     network_id: '3',
  //   },
  //   test: {
  //     provider: function() {
  //       return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/");
  //     },
  //     network_id: '*',
  //   },
  //}





};

