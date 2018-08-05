import { call, put, takeEvery, select } from 'redux-saga/effects'
import { setupPicsumToken } from '../utils/contractHelpers'
import { errOccurred } from '../actions/errors'
import { gotTotalSupply } from '../actions/contracts'
import { coinbaseSelector } from '../selectors/network'

export function* getTotalSupply() {
  try {
    const pmt = yield call(setupPicsumToken)
    const coinbase = yield select(coinbaseSelector)
    const totalSupply = yield call(pmt.methods.totalSupply().call, {
      from: coinbase
    })
    console.log(totalSupply.toString())
    yield put(gotTotalSupply(totalSupply.toString()))
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'get total supply'))
  }
}

function* contractSagas() {
  try {
    yield takeEvery('CONTRACTS:get-total-supply', getTotalSupply)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'contract sagas root'))
  }
}

export default contractSagas
