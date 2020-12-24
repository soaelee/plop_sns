const initialState = {
  user: {
    isLogin: false,
    user: null,
    signupData: {},
    loginData: {}
  },
  post: {
    mainPosts: []
  }
}

//async action creator


//action creator

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT',
  }
}
//(prev state, action) => next state
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: true,
          user: action.data
        }
      }
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: false,
          user: null
        }
      }
    default:
      return state
  }
}

export default reducer