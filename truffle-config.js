const HDWalletProvider = require('truffle-hdwallet-provider');
var path = require('path');
var infura_apikey = "1fc213a037c64e8ca99054d307534c3b";
var mnemonic = "float early electric lazy swarm pluck bean alcohol pelican since chef lava";
var address = "0x20cEE93C127d8F35F54f56e0d28D14219Fe23919"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    develop: {
      port: 7545
    },    
    rinkeby:{
      provider: () => new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/"+infura_apikey),
      network_id: 4,
      from: address,

    }  
  }
};
