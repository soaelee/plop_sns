import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from '../reducers/user'

function* logout(action){
  try{
    // const res = yield call(logoutAPI, action.data)
    yield delay(1000)
    yield put({
      type: LOG_OUT_SUCCESS,
      data: action.data
    })
  } catch (err){
      yield put({
        type: LOG_OUT_FAILURE,
        error: err.response.data
      })
  }
}

function* login(action){
  try{
    // const res = yield call(loginAPI, action.data)
    console.log('login sage')
    yield delay(1000)
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    })
  } catch (err){
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    })
  }
}

function* signup(action){
  try{
    yield delay(1000)
    yield put({
      type: SIGN_UP_SUCCESS,
      data: action.data
    })
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    })
  }
}
function* watchLogout(){
  yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* watchLogin(action) {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchSignup(action){
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup)
  ])
}