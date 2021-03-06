export const checkWeb3 = () => ({
  type: 'NETWORK:checkWeb3'
})

export const gotWeb3 = () => ({
  type: 'NETWORK:got-web3'
})

export const gotNetworkInfo = payload => ({
  type: 'NETWORK:got-network-info',
  payload
})

export default gotWeb3
