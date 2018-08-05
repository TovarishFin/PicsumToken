const testUpdateTokenAddress = async (pmw, newAddress, config) => {
  await pmw.updateTokenAddress(newAddress, config)

  const postAddress = await pmw.nftToken()

  assert.equal(postAddress, newAddress, 'postAddress should equal newAddress')
}

const testSafeTransferFrom = async (
  pmw,
  pmwAsPmt,
  pmt,
  sender,
  receiver,
  tokenId,
  data,
  config
) => {
  const preReceiverBalance = await pmt.balanceOf(receiver)
  const preSenderBalance = await pmt.balanceOf(sender)

  if (data) {
    await pmwAsPmt.safeTransferFrom(sender, receiver, tokenId, data, config)
  } else {
    await pmwAsPmt.safeTransferFrom(sender, receiver, tokenId, config)
  }

  const postReceiverBalance = await pmt.balanceOf(receiver)
  const postSenderBalance = await pmt.balanceOf(sender)
  const postTokenOwner = await pmt.ownerOf(tokenId)
  const postData = await pmw.data()

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
  assert.equal(postTokenOwner, receiver, 'postTokenOwner should equal receiver')

  if (data) {
    assert.equal(postData, data, 'postData should match data')
  }
}

const testBurn = async (pmwAsPmt, pmt, burner, tokenId, config) => {
  const preBurnerBalance = await pmt.balanceOf(burner)
  const preTotalSupply = await pmt.totalSupply()

  await pmwAsPmt.burn(tokenId, config)

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

module.exports = {
  testUpdateTokenAddress,
  testSafeTransferFrom,
  testBurn
}
