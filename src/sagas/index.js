import { fork, call, put } from 'redux-saga/effects'
import networkSagas, { checkWeb3, getNetworkInfo } from './network'
import contractSagas from './contracts'
import { errOccurred } from '../actions/errors'

function* rootSaga() {
  try {
    yield call(checkWeb3)
    yield call(getNetworkInfo)
    yield fork(networkSagas)
    yield fork(contractSagas)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'root saga'))
  }
}

export default rootSaga
