export const getTotalSupply = () => ({
  type: 'CONTRACTS:get-total-supply'
})

export const gotTotalSupply = totalSupply => ({
  type: 'CONTRACTS:got-total-supply',
  payload: totalSupply
})

export const getTokenName = () => ({
  type: 'CONTRACTS:get-token-name'
})

export const gotTokenName = name => ({
  type: 'CONTRACTS:got-token-name',
  payload: name
})

export const getTokenSymbol = () => ({
  type: 'CONTRACTS:get-token-symbol'
})

export const gotTokenSymbol = symbol => ({
  type: 'CONTRACTS:got-token-symbol',
  payload: symbol
})

export const getTokenBalance = address => ({
  type: 'CONTRACTS:get-token-balance',
  payload: address
})

export const gotTokenBalance = (address, tokenBalance) => ({
  type: 'CONTRACTS:got-token-balance',
  payload: {
    address,
    tokenBalance
  }
})

export const getUserTokens = address => ({
  type: 'CONTRACTS:get-user-tokens',
  payload: address
})

export const gotUserTokens = (address, userTokens) => ({
  type: 'CONTRACTS:got-user-tokens',
  payload: {
    address,
    userTokens
  }
})

export const getTokenUri = tokenId => ({
  type: 'CONTRACTS:get-token-uri',
  payload: tokenId
})

export const gotTokenUri = (tokenId, tokenUri) => ({
  type: 'CONTRACTS:got-token-uri',
  payload: {
    tokenId,
    tokenUri
  }
})
