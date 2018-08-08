const { pathOr } = require('ramda')

export const totalSupplySelector = state =>
  pathOr(0, ['contracts', 'totalSupply'], state)

export const tokenNameSelector = state =>
  pathOr('', ['contracts', 'tokenName'], state)

export const tokenSymbolSelector = state =>
  pathOr('', ['contracts', 'tokenSymbol'], state)

export const tokenBalanceSelector = (state, address) =>
  pathOr(0, ['contracts', 'tokenBalances', address], state)

export const userTokensSelector = (state, address) =>
  pathOr([], ['contracts', 'tokensByAddress', address], state)

export const allTokenUrisSelector = state =>
  pathOr({}, ['contracts', 'tokenUriByAddress'], state)
