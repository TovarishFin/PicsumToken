export const getTotalSupply = () => ({
  type: 'CONTRACTS:get-total-supply'
})

export const gotTotalSupply = payload => ({
  type: 'CONTRACTS:got-total-supply',
  payload
})
