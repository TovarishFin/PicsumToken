const {
  defaultName,
  defaultSymbol,
  defaultUriBase,
  setupContract,
  testInitialValues,
  testMint,
  testTransferFrom,
  testApprove,
  testSetApprovalForAll,
  testBurn,
  testConcatenteUri,
  testGetTokenUri
} = require('./helpers/pmt')
const {
  creator,
  tokenReceiver,
  tokenSpender,
  tokenOperator,
  other,
  assertRevert
} = require('./helpers/general')

describe('when deploying an NFT', () => {
  contract('PicsumToken', () => {
    let pmt
    let creatorTokens
    let selectedTokenId // used for various tests...
    // assumed to be 0 due to constructor creating first token for creator

    before('setup contract', async () => {
      pmt = await setupContract(defaultName, defaultSymbol, defaultUriBase, {
        from: creator
      })
      creatorTokens = await pmt.getOwnerTokens(creator)
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
      await testMint(pmt, creator, {
        from: creator
      })
    })

    it('should NOT transfer a token to receiver if sender is not owner', async () => {
      selectedTokenId = creatorTokens[0]

      await assertRevert(
        testTransferFrom(pmt, creator, tokenReceiver, selectedTokenId, {
          from: other
        })
      )
    })

    // TODO: create a receiver contract!!!
    it('should transfer a token to receiver', async () => {
      await testTransferFrom(pmt, creator, tokenReceiver, selectedTokenId, {
        from: creator
      })

      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    it('should burn a token as owner', async () => {
      selectedTokenId = creatorTokens[0]

      await testBurn(pmt, creator, selectedTokenId, {
        from: creator
      })

      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    it('should approve another address to use tokens', async () => {
      selectedTokenId = creatorTokens[0]

      await testApprove(pmt, tokenSpender, selectedTokenId, {
        from: creator
      })
    })

    it('should NOT burn a token as an approved spender for a different token', async () => {
      await assertRevert(
        testApprove(pmt, tokenSpender, selectedTokenId, {
          from: tokenSpender
        })
      )
    })

    it('should burn a token as an approved spender', async () => {
      await testBurn(pmt, creator, selectedTokenId, {
        from: tokenSpender
      })

      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    it('should setApprovalForAll', async () => {
      const isCurrentlyOperator = await pmt.isApprovedForAll(
        creator,
        tokenOperator
      )

      await testSetApprovalForAll(pmt, tokenOperator, !isCurrentlyOperator, {
        from: creator
      })
    })

    it('should burn tokens as an tokenOperator of users tokens', async () => {
      selectedTokenId = creatorTokens[0]

      await testBurn(pmt, creator, selectedTokenId, {
        from: tokenOperator
      })

      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    it('should concatenateUri correctly', async () => {
      selectedTokenId = creatorTokens[0]
      await testConcatenteUri(pmt, selectedTokenId)
    })

    it('should return the correct uri for a given token', async () => {
      await testGetTokenUri(pmt, selectedTokenId)
    })
  })
})
