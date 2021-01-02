import { Popover } from 'antd';
import axios from 'axios';
import { all, call, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import shortId from 'shortid';
import {
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE,
  LIKE_POST_SUCCESS, LIKE_POST_REQUEST, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_USER, REMOVE_POST_OF_USER } from '../reducers/user';

function addPostAPI(data) {
  return axios.post('/post', { content: data }, {
    withCredentials: true,
  });
}

function* addPost(action) {
  try {
    // const res = yield call(loginAPI, action.data)
    const id = shortId.generate();
    const res = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: res.data,
      },
    });
    yield put({
      type: ADD_POST_TO_USER,
      data: res.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
  // 1번 게시글의 댓글 => post/1/comment
}
// content, postId, userId
function* addComment(action) {
  try {
    const res = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* removePost(action) {
  try {
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_USER,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: action.data,
    });
  }
}

function loadPostAPI() {
  return axios.get('/posts');
}

function* loadPost() {
  try {
    const res = yield call(loadPostAPI);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}
function* likePost(action) {
  try {
    const res = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}
function* unlikePost(action) {
  try {
    const res = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLoadPost() {
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
}

function* watchLikePost() {
  yield throttle(2000, LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield throttle(2000, UNLIKE_POST_REQUEST, unlikePost);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLikePost),
    fork(watchUnlikePost),
  ]);
}
