const {
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
} = require('./helpers/pmt')
const {
  creator,
  tokenReceiver,
  other,
  assertRevert
} = require('./helpers/general')

describe('when deploying an NFT', () => {
  contract('PicsumToken', () => {
    let pmt
    // assumed to be 0 due to constructor creating first token for creator
    const creatorTokenId = 0

    before('setup contract', async () => {
      pmt = await setupContract(defaultName, defaultSymbol, defaultUriBase, {
        from: creator
      })
    })

    it('should start with the correct values', async () => {
      await testInitialValues(pmt)
    })

    it('should mint NOT mint a new token if NOT creator', async () => {
      await assertRevert(
        testMint(pmt, tokenReceiver, {
          from: other
        })
      )
    })

    it('should mint a new token if creator', async () => {
      await testMint(pmt, tokenReceiver, {
        from: creator
      })
    })

    it('should NOT transfer a token to receiver if sender is not owner', async () => {
      await assertRevert(
        testTransfer(pmt, creator, tokenReceiver, creatorTokenId, {
          from: other
        })
      )
    })

    // TODO: create a receiver contract!!!
    it('should transfer a token to receiver', async () => {
      await testTransfer(pmt, creator, tokenReceiver, creatorTokenId, {
        from: creator
      })
    })

    it('should burn a token as owner', async () => {
      const creatorTokens = await pmt.getOwnerTokens(creator)
      await testBurn(pmt, creator, creatorTokens[0])
    })

    it('should concatenateUri correctly', async () => {
      const creatorTokens = await pmt.getOwnerTokens(creator)
      await testConcatenteUri(pmt, creatorTokens[0])
    })

    it('should return the correct uri for a given token', async () => {
      const creatorTokens = await pmt.getOwnerTokens(creator)
      await testGetTokenUri(pmt, creatorTokens[0])
    })
  })
})
