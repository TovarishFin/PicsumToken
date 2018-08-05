const defaultState = {
  totalSupply: 0
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'CONTRACTS:got-total-supply':
      return {
        ...state,
        totalSupply: action.payload
      }
    default:
      return state
  }
}

export default reducer
