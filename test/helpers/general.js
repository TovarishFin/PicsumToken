const BigNumber = require('bignumber.js')

const accounts = web3.eth.accounts

const creator = accounts[0]
const tokenOwner = accounts[1]
const tokenReceiver = accounts[2]
const tokenSpender = accounts[3]
const tokenOperator = accounts[4]
const other = accounts[5]

const assertRevert = async promise => {
  try {
    await promise
    assert.fail('Expected revert not received')
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0
    assert(revertFound, `Expected "revert", got ${error} instead`)
  }
}

const bigZero = new BigNumber(0)
const addressZero = '0x' + '0'.repeat(40)

module.exports = {
  accounts,
  creator,
  tokenOwner,
  tokenReceiver,
  tokenSpender,
  tokenOperator,
  other,
  assertRevert,
  bigZero,
  addressZero
}
