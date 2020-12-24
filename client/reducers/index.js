import { HYDRATE } from 'next-redux-wrapper'
import user from './user'
import post from './post'

import { combineReducers } from 'redux'

//(prev state, action) => next state
const rootReducer = combineReducers({
  //HYDRATE를 위한 index reducer 추가(SSR)
  index: (state = {}, action) => {
    switch(action.type) {
      case HYDRATE:
        return {...state, ...action.payload}
      default:
        return state
    }
  },
  user,
  post,
  }
)

export default rootReducer