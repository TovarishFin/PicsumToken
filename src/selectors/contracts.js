const { pathOr } = require('ramda')

export const totalSupplySelector = state =>
  pathOr(0, ['contracts', 'picsumToken', 'totalSupply'], state)

export default totalSupplySelector
