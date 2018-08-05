require('dotenv').config()

const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic = process.env.RINKEBY_MNEMONIC

module.exports = {
  networks: {
    dev: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 6.5e6,
      gasPrice: 5e9
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      network_id: 4,
      gas: 6e6,
      gasPrice: 5e9,
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io')
    }
  }
}
