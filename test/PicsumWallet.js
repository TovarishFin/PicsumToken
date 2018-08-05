const {
  setupContracts,
  defaultName,
  defaultSymbol,
  defaultUriBase,
  testSetApprovalForAll,
  testSafeTransferFrom
} = require('./helpers/pmt')
const { creator, tokenReceiver, walletOwner } = require('./helpers/general')

describe('when using PicsumWallet', () => {
  contract('PicsumWallet', () => {
    let pmt, pmw, pmwAsPmt, creatorTokens, selectedTokenId

    beforeEach('update selectedTokenId', () => {
      selectedTokenId = creatorTokens[0]
    })

    before('setup contracts', async () => {
      const contracts = await setupContracts(
        defaultName,
        defaultSymbol,
        defaultUriBase,
        {
          from: creator
        },
        {
          from: walletOwner
        }
      )
      pmt = contracts.pmt
      pmw = contracts.pmw
      pmwAsPmt = contracts.pmwAsPmt

      // set PicsumWallet to operator of creator tokens
      await testSetApprovalForAll(pmt, pmw.address, true, {
        from: creator
      })

      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    afterEach('update creatorTokens', async () => {
      // update creatorTokens array after transfer
      creatorTokens = await pmt.getOwnerTokens(creator)
    })

    it('should forward calls to PicsumToken', async () => {
      const name = await pmwAsPmt.name()
      assert.equal(
        name,
        defaultName,
        'name should equal defaultName from pmt contract'
      )
    })

    it('should safeTransferFrom from operator to pmw', async () => {
      const isApprovedForAll = await pmwAsPmt.isApprovedForAll(
        creator,
        pmwAsPmt.address
      )
      console.log(isApprovedForAll)
      assert(isApprovedForAll, 'pmw should be approved for creator')
      await testSafeTransferFrom(
        pmwAsPmt,
        creator,
        tokenReceiver,
        selectedTokenId,
        null,
        {
          from: walletOwner
        }
      )
    })
  })
})
