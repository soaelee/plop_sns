import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
// 필수우우우우
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(postSaga),
    fork(userSaga),
  ]);
}

// saga effects

// 항상 effect 앞에는 yield를 붙임
// all은 배열을 받고, 배열을 한 번에 실행시킴

// fork는 generator 함수를 실행시킴 <=> call과 다름
// take는 액션이 실행될때까지 기다리고, 실행되면 그 전에 미들웨어 제너레이터를 실행시키겠다.
// call을 해서 api를 실행한다.
// put은 action을 dispatch
// rootSaga => watchGenerator => 해당Generator => 비동기액션 => 해당Generator => action

// fork(root) => take(watch) => [call(API) => put(action)](generator)
// take해서 넘길 때, action이 객체로 들어가기 때문에 action을 받아서 action.data를 넘길 수 있음
// fork는 비동기 함수 호출 (rootSaga에서 쓰임)
// call은 동기 함수 호출 (axios할 때)
