const defaultState = {
  totalSupply: 0,
  tokenName: '',
  tokenSymbol: '',
  tokenBalances: {},
  tokensByAddress: {},
  tokenUriByAddress: {}
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'CONTRACTS:got-total-supply':
      return {
        ...state,
        totalSupply: action.payload
      }

    case 'CONTRACTS:got-token-name':
      return {
        ...state,
        tokenName: action.payload
      }

    case 'CONTRACTS:got-token-symbol':
      return {
        ...state,
        tokenSymbol: action.payload
      }

    case 'CONTRACTS:got-token-balance':
      return {
        ...state,
        tokenBalances: {
          ...state.tokenBalances,
          [action.payload.address]: action.payload.tokenBalance
        }
      }

    case 'CONTRACTS:got-user-tokens':
      return {
        ...state,
        tokensByAddress: {
          ...state.tokensByAddress,
          [action.payload.address]: action.payload.userTokens
        }
      }

    case 'CONTRACTS:got-token-uri':
      return {
        ...state,
        tokenUriByAddress: {
          ...state.tokenUriByAddress,
          [action.payload.tokenId]: action.payload.tokenUri
        }
      }

    default:
      return state
  }
}

export default reducer
