import { addressZero } from '../utils/ethereum'

const defaultState = {
  web3Ready: false,
  coinbase: addressZero,
  networkId: 1,
  blockNumber: 0
}

const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'NETWORK:got-web3':
      return {
        ...state,
        web3Ready: true
      }
    case 'NETWORK:got-network-info':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default reducer
