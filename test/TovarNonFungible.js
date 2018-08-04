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
} = require('./helpers/tnf')
const {
  creator,
  tokenReceiver,
  other,
  assertRevert
} = require('./helpers/general')

describe('when deploying an NFT', () => {
  contract('PicsumToken', () => {
    let tnf
    // assumed to be 0 due to constructor creating first token for creator
    const creatorTokenId = 0

    before('setup contract', async () => {
      tnf = await setupContract(defaultName, defaultSymbol, defaultUriBase, {
        from: creator
      })
    })

    it('should start with the correct values', async () => {
      await testInitialValues(tnf)
    })

    it('should mint NOT mint a new token if NOT creator', async () => {
      await assertRevert(
        testMint(tnf, tokenReceiver, {
          from: other
        })
      )
    })

    it('should mint a new token if creator', async () => {
      await testMint(tnf, tokenReceiver, {
        from: creator
      })
    })

    it('should NOT transfer a token to receiver if sender is not owner', async () => {
      await assertRevert(
        testTransfer(tnf, creator, tokenReceiver, creatorTokenId, {
          from: other
        })
      )
    })

    // TODO: create a receiver contract!!!
    it('should transfer a token to receiver', async () => {
      await testTransfer(tnf, creator, tokenReceiver, creatorTokenId, {
        from: creator
      })
    })

    it('should burn a token as owner', async () => {
      const creatorTokens = await tnf.getOwnerTokens(creator)
      await testBurn(tnf, creator, creatorTokens[0])
    })

    it('should concatenateUri correctly', async () => {
      const creatorTokens = await tnf.getOwnerTokens(creator)
      await testConcatenteUri(tnf, creatorTokens[0])
    })

    it('should return the correct uri for a given token', async () => {
      const creatorTokens = await tnf.getOwnerTokens(creator)
      await testGetTokenUri(tnf, creatorTokens[0])
    })
  })
})
