import Web3 from 'web3'

//import ProviderEngine from 'web3-provider-engine'
import ZeroClientProvider from 'web3-provider-engine/zero'

export const addressZero = `0x${'0'.repeat(40)}`

export const prunedaddressZero = '0'.repeat(40)

export const getNetworkId = () =>
  new Promise((resolve, reject) => {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3 available'))
    } else {
      window.web3.version.getNetwork((err, network) => {
        resolve(network)
      })
    }
  })

export const getBlockNumber = () =>
  new Promise((resolve, reject) => {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3 available'))
    } else {
      window.web3.eth.getBlockNumber((err, res) => {
        if (err) {
          return reject(err)
        }

        resolve(res)
      })
    }
  })

export const getWeb3 = () =>
  new Promise((resolve, reject) => {
    if (!window) {
      return reject(new Error('still server side...'))
    }

    if (window.web3) {
      resolve(new Web3(web3.currentProvider))
    }

    window.addEventListener('load', () => {
      if (typeof window.web3 !== 'undefined') {
        return resolve(new Web3(window.web3.currentProvider))
      } else {
        // TODO: change to mainnet when ready to rock
        const engine = ZeroClientProvider({
          static: {
            eth_syncing: false,
            web3_clientVersion: 'ZeroClientProvider'
          },
          getAccounts: cb => cb(null, []),
          rpcUrl: 'https://kovan.infura.io'
        })
        const web3 = new Web3(engine)
        window.web3 = web3
      }

      resolve(web3)
    })
  })

export const getAccounts = () =>
  new Promise((resolve, reject) => {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3'))
    }

    window.web3.eth.getAccounts((err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })

export const getCoinbase = () =>
  new Promise((resolve, reject) => {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3'))
    }

    window.web3.eth.getCoinbase((err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })

export const watchForEvent = (contract, eventName, args, filterArgs) =>
  new Promise((resolve, reject) => {
    const event = contract[eventName](args, filterArgs, (err, res) => {
      if (err) {
        // eslint-disable-next-line no-console
        return reject(err)
      }

      resolve(res)
      event.stopWatching()
    })
  })

export const getTransaction = txid =>
  new Promise((resolve, reject) => {
    window.web3.eth.getTransactionReceipt(txid, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })

export const getEtherBalance = address =>
  new Promise((resolve, reject) => {
    window.web3.eth.getBalance(address, (err, res) => {
      if (err) {
        return reject(err)
      }

      resolve(res)
    })
  })

export const sendTransaction = args => {
  return new Promise(function(resolve, reject) {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3'))
    } else {
      window.web3.eth.sendTransaction(args, (err, res) => {
        if (err) {
          return reject(err)
        } else {
          resolve(res)
        }
      })
    }
  })
}

export const getCode = address => {
  return new Promise((resolve, reject) => {
    if (typeof window != 'object' || !window.web3) {
      return reject(new Error('no web3'))
    } else {
      window.web3.eth.getCode(address, (err, res) => {
        if (err) {
          return reject(err)
        } else {
          resolve(res)
        }
      })
    }
  })
}
