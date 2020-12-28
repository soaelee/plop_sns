export const initialState = {
  user: null,

  loginData: {},
  signupData: {},
  
  loginLoading: false, //로그인 시도중
  loginDone: false,
  loginError: null,
  
  logoutLoading: false, //로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  
  signupLoading: false, //회원가입 시도중
  signupDone: false,
  signupError: null
}

const dummyUser = data => ({
  ...data,
  nickname: 'soae',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: []
})
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const loginRequestAction = data => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  }
}

export const signupRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case LOG_IN_REQUEST: 
      console.log('login reducer')
      return {
        ...state,
        loginLoading: true,
        loginError: null,
        loginDone: false
      }
    case LOG_IN_SUCCESS:
      return{
        ...state,
        loginLoading: false,
        loginDone: true,
        user: dummyUser(action.data),
        loginError: null
      }
    case LOG_IN_FAILURE:
      return{
        ...state,
        loginLoading: false,
        loginDone: false,
        loginErrorr: action.error
      }
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutError: null,
        loginDone: false
      }
    case LOG_OUT_SUCCESS:
      return{
        ...state,
        logoutLoading : false,
        logoutDone: false,
        user: null,
        logoutError: null
      }
    case LOG_OUT_FAILURE :
      return{
        ...state,
        logoutLoading: false,
        logoutError: action.error,
        logoutDone: false
      }
    case SIGN_UP_REQUEST:
      console.log('reducer')
      return{
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null
      }
    case SIGN_UP_SUCCESS:
      return{
        ...state,
        signupLoading: false,
        signupDone: true,
        signupData: action.data
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signupDone: false,
        signupLoading: false,
        signupError: action.error
      }
    default:
      return state
  }
}

export default reducer