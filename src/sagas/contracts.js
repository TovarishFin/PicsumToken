import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { setupPicsumToken } from '../utils/contractHelpers'
import { errOccurred } from '../actions/errors'
import {
  gotTotalSupply,
  gotTokenName,
  gotTokenSymbol,
  gotTokenBalance,
  gotUserTokens,
  gotTokenUri
} from '../actions/contracts'
import { coinbaseSelector, networkIdSelector } from '../selectors/network'

export function* getTokenName() {
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const tokenName = yield call(pmt.methods.name().call, {
      from: coinbase
    })

    yield put(gotTokenName(tokenName))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get token name'))
  }
}

export function* getTokenSymbol() {
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const tokenSymbol = yield call(pmt.methods.symbol().call, {
      from: coinbase
    })

    yield put(gotTokenSymbol(tokenSymbol))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get token name'))
  }
}

export function* getTotalSupply() {
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const totalSupply = yield call(pmt.methods.totalSupply().call, {
      from: coinbase
    })
    yield put(gotTotalSupply(totalSupply))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get total supply'))
  }
}

export function* getTokenBalance(action) {
  const address = action.payload
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const tokenBalance = yield call(pmt.methods.balanceOf(address).call, {
      from: coinbase
    })
    yield put(gotTokenBalance(address, tokenBalance))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get user balance'))
  }
}

export function* getUserTokens(action) {
  const address = action.payload
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const userTokens = yield call(pmt.methods.getOwnerTokens(address).call, {
      from: coinbase
    })
    yield put(gotUserTokens(address, userTokens))
    const tokenUriLookups = userTokens.map(tokenId =>
      // eslint-disable-next-line redux-saga/yield-effects
      call(getTokenUri, { payload: tokenId })
    )
    yield all(tokenUriLookups)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get user tokens'))
  }
}

export function* getTokenUri(action) {
  const tokenId = action.payload
  try {
    const networkId = yield select(networkIdSelector)
    const pmt = yield call(setupPicsumToken, networkId)
    const coinbase = yield select(coinbaseSelector)

    const tokenUri = yield call(pmt.methods.tokenURI(tokenId).call, {
      from: coinbase
    })

    yield put(gotTokenUri(tokenId, tokenUri))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get token URI'))
  }
}

function* contractSagas() {
  try {
    yield takeEvery('CONTRACTS:get-total-supply', getTotalSupply)
    yield takeEvery('CONTRACTS:get-token-name', getTokenName)
    yield takeEvery('CONTRACTS:get-token-symbol', getTokenSymbol)
    yield takeEvery('CONTRACTS:get-token-balance', getTokenBalance)
    yield takeEvery('CONTRACTS:get-user-tokens', getUserTokens)
    yield takeEvery('CONTRACTS:get-token-uri', getTokenUri)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'contract sagas root'))
  }
}

export default contractSagas
