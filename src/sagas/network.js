import { call, put, select, fork, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import {
  getWeb3,
  getCoinbase,
  getNetworkId,
  getBlockNumber
} from '../utils/ethereum'
import { gotWeb3, gotNetworkInfo } from '../actions/network'
import { errOccurred } from '../actions/errors'
import {
  coinbaseSelector,
  networkIdSelector,
  blockNumberSelector
} from '../selectors/network'
import { getTokenBalance, getUserTokens } from '../actions/contracts'

const pollingDelay = 3000

export function* getNetworkInfo() {
  let oldCoinbase, oldBlockNumber, oldNetworkId

  try {
    oldCoinbase = yield select(coinbaseSelector)
    oldNetworkId = yield select(networkIdSelector)
    oldBlockNumber = yield select(blockNumberSelector)
    const coinbase = yield call(getCoinbase)
    const networkId = yield call(getNetworkId)
    const blockNumber = yield call(getBlockNumber)

    if (
      coinbase != oldCoinbase ||
      networkId != oldNetworkId ||
      blockNumber != oldBlockNumber
    ) {
      yield put(
        gotNetworkInfo({ coinbase, networkId, blockNumber, web3Ready: true })
      )

      if (coinbase) {
        yield put(getTokenBalance(coinbase))
        yield put(getUserTokens(coinbase))
      }
    }
  } catch (err) {
    yield put(
      gotNetworkInfo({
        oldCoinbase,
        oldNetworkId,
        oldBlockNumber,
        web3Ready: false
      })
    )
    yield put(errOccurred(err.message, err.stack, 'get network info'))
  }
}

function* watchNetworkInfo() {
  while (true) {
    try {
      yield call(getNetworkInfo)
      yield delay(pollingDelay)
    } catch (err) {
      yield put(errOccurred(err.message, err.stack, 'watch network info'))
      yield delay(pollingDelay)
      yield call(getNetworkInfo)
    }
  }
}

export function* checkWeb3() {
  try {
    yield call(getWeb3)
    yield put(gotWeb3())
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'check web3'))
  }
}

function* networkSagas() {
  try {
    yield fork(watchNetworkInfo)
    yield takeEvery('NETWORK:checkWeb3', checkWeb3)
    yield takeEvery('NETWORK:get-network-info', getNetworkInfo)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'network sagas root'))
  }
}

export default networkSagas
