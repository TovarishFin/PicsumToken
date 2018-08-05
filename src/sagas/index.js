import { fork, call, put } from 'redux-saga/effects'
import networkSagas, { checkWeb3 } from './network'
import { errOccurred } from '../actions/errors'

function* rootSaga() {
  try {
    yield call(checkWeb3)
    yield fork(networkSagas)
  } catch (err) {
    yield put(errOccurred(err.message, err.stack, 'root saga'))
  }
}

export default rootSaga
