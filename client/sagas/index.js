import { all, call, fork, put, take } from 'redux-saga/effects'
import axios from 'axios'

function loginAPI(data) {
  return axios.post('/api/login', data)
  // 실제로 서버에 요청
}

function* login(action){
  try{
    const res = yield call(loginAPI, action.data)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: res.data
    }) 
  } catch (err){
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data
    })
  }
}

function logoutAPI() {
  return axios.post('/api/logout')
  // 실제로 서버에 요청
}

function* logout(){
  try{
    const res = yield call(logoutAPI)
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: res.data
    }) 
  } catch (err){
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data
    })
  }
}
function addPostAPI(data) {
  return axios.post('/api/addPost', data)
  // 실제로 서버에 요청
}

function* addPost(action){
  try{
    const res = yield call(addPostAPI, action.data)
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: res.data
    }) 
  } catch (err){
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.response.data
    })
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', login)
}
function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logout)
}
function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost)
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAddPost)
  ])
}

// saga effects

// 항상 effect 앞에는 yield를 붙임
// all은 배열을 받고, 배열을 한 번에 실행시킴

// fork는 generator 함수를 실행시킴 <=> call과 다름
// take는 액션이 실행될때까지 기다리고, 실행되면 그 전에 미들웨어 제너레이터를 실행시키겠다.
// call을 해서 api를 실행한다.
// put은 action을 dispatch
//rootSaga => watchGenerator => 해당Generator => 비동기액션 => 해당Generator => action

// fork => take => (call => put)
//take해서 넘길 때, action이 객체로 들어가기 때문에 action을 받아서 action.data를 넘길 수 있음
// fork는 비동기 함수 호출 (rootSaga에서 쓰임) 
// call은 동기 함수 호출 (axios할 때)