import { NodeCollapseOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import produce from 'immer';

export const initialState = {
  user: null,

  loginData: {},
  signupData: {},

  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,

  logoutLoading: false, // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,

  signupLoading: false, // 회원가입 시도중
  signupDone: false,
  signupError: null,

  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,

  followLoading: false,
  followDone: false,
  followError: null,

  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,

};

const dummyUser = (data) => ({
  ...data,
  nickname: 'soae',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [{ id: 'dalso' }, { id: 'jjagu' }],
  Followers: [{ id: 'dalso' }, { id: 'jjagu' }],
});

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

// 얘네는 컴포넌트에서 재사용할 일이 없으니까 action creator로 생성하지 않아도 됨
export const ADD_POST_TO_USER = 'ADD_POST_TO_USER';
export const REMOVE_POST_OF_USER = 'REMOVE_POST_OF_USER';

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

export const signupRequestAction = (data) => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const changeNicknameRequestAction = (data) => ({
  type: CHANGE_NICKNAME_REQUEST,
  data,
});

export const followRequestAction = (data) => ({
  type: FOLLOW_REQUEST,
  data,
});

export const unfollowRequestAction = (data) => ({
  type: UNFOLLOW_REQUEST,
  data,
});
const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.loginError = null;
      draft.user = action.data;
      break;
    case LOG_IN_FAILURE:
      draft.loginLoading = false;
      draft.loginDone = false;
      draft.loginError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logoutLoading = true;
      draft.logoutDone = false;
      draft.logoutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.logoutLoading = false;
      draft.logoutDone = true;
      draft.logoutError = null;
      draft.user = null;
      break;
    case LOG_OUT_FAILURE:
      draft.logoutLoading = false;
      draft.logoutDone = false;
      draft.logoutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      draft.signupError = null;
      draft.signupData = action.data;
      break;
    case SIGN_UP_FAILURE:
      draft.signupLoading = false;
      draft.signupDone = false;
      draft.signupError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = action.error;
      break;
    case ADD_POST_TO_USER:
      draft.user.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_OF_USER:
      console.log(action.data);
      draft.user.Posts = draft.user.Posts.filter((post) => post.id !== action.data);
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      draft.followError = null;
      draft.user.Followings.push({ id: action.data });
      break;
    case FOLLOW_FAILURE:
      draft.followLoading = false;
      draft.followDone = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      draft.unfollowError = null;
      draft.user.Followings = draft.user.Followings.filter((f) => f.id !== action.data);
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoading = false;
      draft.unfollowDone = false;
      draft.unfollowError = action.error;
      break;
    default: break;
  }
});

export default reducer;
