const {
  setupContracts,
  defaultName,
  defaultSymbol,
  defaultUriBase,
  testSetApprovalForAll
} = require('./helpers/pmt')
const {
  testUpdateTokenAddress,
  testSafeTransferFrom
} = require('./helpers/pmw')
const {
  creator,
  tokenReceiver,
  walletOwner,
  other,
  assertRevert
} = require('./helpers/general')

describe('when using PicsumWallet', () => {
  contract('PicsumWallet', () => {
    let pmt, pmw, pmwAsPmt, ncw, creatorTokens, selectedTokenId

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
      pmw = contracts.pmw // same address as pmwAsPmt
      pmwAsPmt = contracts.pmwAsPmt // same address as pmw
      ncw = contracts.ncw

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
      const name = await pmwAsPmt.name({ from: walletOwner })
      assert.equal(
        name,
        defaultName,
        'name should equal defaultName from pmt contract'
      )
    })

    it('should safeTransferFrom from operator to pmw', async () => {
      await testSafeTransferFrom(
        pmwAsPmt,
        pmt,
        creator,
        tokenReceiver,
        selectedTokenId,
        null,
        {
          from: walletOwner
        }
      )
    })

    it('should NOT updateTokenAddress if NOT owner', async () => {
      await assertRevert(
        testUpdateTokenAddress(pmw, ncw.address, {
          from: other
        })
      )
    })

    it('shoud updateTokenAddress', async () => {
      await testUpdateTokenAddress(pmw, ncw.address, {
        from: walletOwner
      })
    })
  })
})
