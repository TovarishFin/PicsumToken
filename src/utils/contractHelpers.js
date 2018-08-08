import PicsumToken from '../../build/contracts/PicsumToken'
import PicsumWallet from '../../build/contracts/PicsumWallet'
import { getWeb3 } from '../utils/ethereum'

export const setupPicsumToken = async networkId => {
  const web3 = await getWeb3()

  const picsumToken = new web3.eth.Contract(
    PicsumToken.abi,
    PicsumToken.networks[networkId].address
  )

  return picsumToken
}

export const setupPicsumWallet = async networkId => {
  const web3 = await getWeb3()
  const picsumWallet = new web3.eth.Contract(
    PicsumWallet.abi,
    PicsumWallet.networks[networkId].address
  )

  return picsumWallet
}
