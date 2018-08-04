const PicsumToken = artifacts.require('PicsumToken')
const { creator, addressZero } = require('./general')
const { hexToAscii } = require('web3-utils')

const defaultName = 'PicsumToken'
const defaultSymbol = 'pmt'
const defaultUriBase = 'https://picsum.photos/200/300?image='

const setupContract = async (name, symbol, config) => {
  const pmt = await PicsumToken.new(name, symbol, config)

  return pmt
}

const testInitialValues = async pmt => {
  const name = await pmt.name()
  const symbol = await pmt.symbol()
  const totalSupply = await pmt.totalSupply()
  const creatorBalance = await pmt.balanceOf(creator)
  const initialTokenOwner = await pmt.ownerOf(0)
  const tokenExists = await pmt.exists(0)
  const uriBase = await pmt.uriBase()
  const uriBaseAscii = hexToAscii(uriBase)

  assert.equal(name, defaultName, 'name should match expected name')
  assert.equal(symbol, defaultSymbol, 'symbol should match expected symbol')
  assert.equal(totalSupply.toString(), '10', 'totalSupply should be 1')
  assert.equal(creatorBalance.toString(), '10', 'creator balance should be 1')
  assert(tokenExists, 'first token created should exist')
  assert.equal(
    initialTokenOwner,
    creator,
    'first token created should be owned by creator'
  )
  assert.equal(
    uriBaseAscii,
    defaultUriBase,
    'uriBase should equal defaultUriBase'
  )
}

const testMint = async (pmt, receiver, config) => {
  const preReceiverBalance = await pmt.balanceOf(receiver)
  const preTotalSupply = await pmt.totalSupply()

  await pmt.mint(receiver, config)

  const postReceiverBalance = await pmt.balanceOf(receiver)
  const postTotalSupply = await pmt.totalSupply()

  assert.equal(
    postReceiverBalance.sub(preReceiverBalance).toString(),
    '1',
    'receiver balance should be incremented by 1'
  )
  assert.equal(
    postTotalSupply.sub(preTotalSupply).toString(),
    '1',
    'totalSupply should be incremented by 1'
  )
}

// TODO double check that tokenId no longer belongs to sender & belongs to receiver
const testTransferFrom = async (pmt, sender, receiver, tokenId, config) => {
  const preReceiverBalance = await pmt.balanceOf(receiver)
  const preSenderBalance = await pmt.balanceOf(sender)

  await pmt.transferFrom(sender, receiver, tokenId, config)

  const postReceiverBalance = await pmt.balanceOf(receiver)
  const postSenderBalance = await pmt.balanceOf(sender)

  assert.equal(
    postReceiverBalance.sub(preReceiverBalance).toString(),
    '1',
    'receiver token balance should be incremented by 1'
  )
  assert.equal(
    preSenderBalance.sub(postSenderBalance).toString(),
    '1',
    'sender token balance should be decremented by 1'
  )
}

const testApprove = async (pmt, spender, tokenId, config) => {
  const preApproved = await pmt.getApproved(tokenId)

  await pmt.approve(spender, tokenId, config)

  const postApproved = await pmt.getApproved(tokenId)

  assert.equal(
    preApproved,
    addressZero,
    'preApproved should have no approved spender'
  )
  assert.equal(postApproved, spender, 'postApproved should equal spender')
}

const testBurn = async (pmt, burner, tokenId, config) => {
  const preBurnerBalance = await pmt.balanceOf(burner)
  const preTotalSupply = await pmt.totalSupply()

  await pmt.burn(tokenId, config)

  const postBurnerBalance = await pmt.balanceOf(burner)
  const postTotalSupply = await pmt.totalSupply()

  assert.equal(
    preBurnerBalance.sub(postBurnerBalance).toString(),
    '1',
    'burner token balance should be decremented by 1'
  )
  assert.equal(
    preTotalSupply.sub(postTotalSupply).toString(),
    '1',
    'totalSupply should be decremented by 1'
  )
}

const testConcatenteUri = async (pmt, tokenId) => {
  const concatenated = await pmt.concatenateUri(tokenId)

  assert.equal(
    concatenated,
    defaultUriBase + tokenId,
    'tokenUri should return defaultUriBase concatenated with tokenId'
  )
}

const testGetTokenUri = async (pmt, tokenId) => {
  const tokenUri = await pmt.tokenURI(tokenId)

  assert.equal(
    tokenUri,
    defaultUriBase + tokenId,
    'tokenUri should return defaultUriBase concatenated with tokenId'
  )
}

module.exports = {
  defaultName,
  defaultSymbol,
  defaultUriBase,
  setupContract,
  testInitialValues,
  testMint,
  testTransferFrom,
  testApprove,
  testBurn,
  testConcatenteUri,
  testGetTokenUri
}
