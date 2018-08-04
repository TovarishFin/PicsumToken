const PicsumToken = artifacts.require('PicsumToken')
const { creator } = require('./general')
const { hexToAscii } = require('web3-utils')

const defaultName = 'PicsumToken'
const defaultSymbol = 'TNF'
const defaultUriBase = 'https://picsum.photos/200/300?image='

const setupContract = async (name, symbol, config) => {
  const tnf = await PicsumToken.new(name, symbol, config)

  return tnf
}

const testInitialValues = async tnf => {
  const name = await tnf.name()
  const symbol = await tnf.symbol()
  const totalSupply = await tnf.totalSupply()
  const creatorBalance = await tnf.balanceOf(creator)
  const initialTokenOwner = await tnf.ownerOf(0)
  const tokenExists = await tnf.exists(0)
  const uriBase = await tnf.uriBase()
  const uriBaseAscii = hexToAscii(uriBase)

  assert.equal(name, defaultName, 'name should match expected name')
  assert.equal(symbol, defaultSymbol, 'symbol should match expected symbol')
  assert.equal(totalSupply.toString(), '3', 'totalSupply should be 1')
  assert.equal(creatorBalance.toString(), '3', 'creator balance should be 1')
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

const testMint = async (tnf, receiver, config) => {
  const preReceiverBalance = await tnf.balanceOf(receiver)
  const preTotalSupply = await tnf.totalSupply()

  await tnf.mint(receiver, config)

  const postReceiverBalance = await tnf.balanceOf(receiver)
  const postTotalSupply = await tnf.totalSupply()

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
const testTransfer = async (tnf, sender, receiver, tokenId, config) => {
  const preReceiverBalance = await tnf.balanceOf(receiver)
  const preSenderBalance = await tnf.balanceOf(sender)

  await tnf.transferFrom(sender, receiver, tokenId, config)

  const postReceiverBalance = await tnf.balanceOf(receiver)
  const postSenderBalance = await tnf.balanceOf(sender)

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

const testBurn = async (tnf, burner, tokenId, config) => {
  const preBurnerBalance = await tnf.balanceOf(burner)
  const preTotalSupply = await tnf.totalSupply()

  await tnf.burn(tokenId, config)

  const postBurnerBalance = await tnf.balanceOf(burner)
  const postTotalSupply = await tnf.totalSupply()

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

const testConcatenteUri = async (tnf, tokenId) => {
  const concatenated = await tnf.concatenateUri(tokenId)

  assert.equal(
    concatenated,
    defaultUriBase + tokenId,
    'tokenUri should return defaultUriBase concatenated with tokenId'
  )
}

const testGetTokenUri = async (tnf, tokenId) => {
  const tokenUri = await tnf.tokenURI(tokenId)

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
  testTransfer,
  testBurn,
  testConcatenteUri,
  testGetTokenUri
}
