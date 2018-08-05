import { pathOr } from 'ramda'
import { zeroAddress } from '../utils/ethereum'

export const networkSelector = state =>
  pathOr('1', ['contracts', 'network'], state)

export const coinbaseSelector = state =>
  pathOr(zeroAddress, ['contracts', 'coinbase'], state)

export const blockNumberSelector = state =>
  pathOr(0, ['contracts', 'blockNumber'], state)
