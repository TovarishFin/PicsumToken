const testUpdateTokenAddress = async (pmw, newAddress, config) => {
  await pmw.updateTokenAddress(newAddress, config)

  const postAddress = await pmw.nftToken()

  assert.equal(postAddress, newAddress, 'postAddress should equal newAddress')
}

const testSafeTransferFrom = async (
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
}

module.exports = {
  testUpdateTokenAddress,
  testSafeTransferFrom
}
