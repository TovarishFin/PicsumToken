const accounts = web3.eth.accounts

const creator = accounts[0]
const tokenOwner = accounts[1]
const tokenReceiver = accounts[2]
const tokenSpender = accounts[3]
const other = accounts[4]

const assertRevert = async promise => {
  try {
    await promise
    assert.fail('Expected revert not received')
  } catch (error) {
    const revertFound = error.message.search('revert') >= 0
    assert(revertFound, `Expected "revert", got ${error} instead`)
  }
}

module.exports = {
  accounts,
  creator,
  tokenOwner,
  tokenReceiver,
  tokenSpender,
  other,
  assertRevert
}
