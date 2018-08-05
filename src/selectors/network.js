import { pathOr } from 'ramda'
import { addressZero } from '../utils/ethereum'

export const networkIdSelector = state =>
  pathOr('1', ['network', 'networkId'], state)

export const coinbaseSelector = state =>
  pathOr(addressZero, ['network', 'coinbase'], state)

export const blockNumberSelector = state =>
  pathOr(0, ['network', 'blockNumber'], state)

export const web3ReadySelector = state =>
  pathOr(false, ['network', 'web3Ready'], state)
