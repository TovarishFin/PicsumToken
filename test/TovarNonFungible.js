const {
  defaultName,
  defaultSymbol,
  defaultUriBase,
  setupContract,
  testInitialValues,
  testMint,
  testTransferFrom,
  testSafeTransferFrom,
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
    let pmw
    let ncw
    let creatorTokens
    let selectedTokenId // used for various tests...

    beforeEach('update selectedTokenId', () => {
      selectedTokenId = creatorTokens[0]
    })

    before('setup contracts', async () => {
      const contracts = await setupContract(
        defaultName,
        defaultSymbol,
        defaultUriBase,
        {
          from: creator
        }
      )
      pmt = contracts.pmt
      pmw = contracts.pmw
      ncw = contracts.ncw

      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    afterEach('update creatorTokens', async () => {
      // update creatorTokens array after transfer
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
      await assertRevert(
        testTransferFrom(pmt, creator, tokenReceiver, selectedTokenId, {
          from: other
        })
      )
    })

    it('should transfer a token to receiver', async () => {
      await testTransferFrom(pmt, creator, tokenReceiver, selectedTokenId, {
        from: creator
      })
    })

    it('should safeTransferFrom to a user address', async () => {
      await testSafeTransferFrom(
        pmt,
        creator,
        tokenReceiver,
        selectedTokenId,
        null,
        {
          from: creator
        }
      )
    })

    it('should NOT safeTransferFrom to a non-compliant wallet contract', async () => {
      await assertRevert(
        testSafeTransferFrom(pmt, creator, ncw.address, selectedTokenId, null, {
          from: creator
        })
      )
    })

    it('should safeTransferFrom to a compliant wallet contract', async () => {
      await testSafeTransferFrom(
        pmt,
        creator,
        pmw.address,
        selectedTokenId,
        null,
        {
          from: creator
        }
      )
    })

    it('should burn a token as owner', async () => {
      await testBurn(pmt, creator, selectedTokenId, {
        from: creator
      })
    })

    it('should approve another address to use tokens', async () => {
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
      await testBurn(pmt, creator, selectedTokenId, {
        from: tokenOperator
      })
    })

    it('should concatenateUri correctly', async () => {
      await testConcatenteUri(pmt, selectedTokenId)
    })

    it('should return the correct uri for a given token', async () => {
      await testGetTokenUri(pmt, selectedTokenId)
    })
  })
})
