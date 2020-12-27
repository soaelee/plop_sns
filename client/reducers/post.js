//dummy data

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'JJAGU',
    },
    content: 'First Content #Hash #Tag',
    Images: [{
      src: 'https://img6.yna.co.kr/photo/cms/2019/05/02/02/PCM20190502000402370_P4.jpg'
    },{
      src: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2020/10/PS20100800026.jpg'
    },{
      src: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2020/10/PS20100800026.jpg'
    }],
    Comments: [{
      User: {
        nickname: 'nero'
      },
      content: 'Wow! cool!!!!'
    },{
      User: {
        nickname: 'babo'
      },
      content: 'nice'
    }]
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null
}

const dummyPost = {
  id: 2,
  content: 'dummy data',
  User: {
    id: 1,
    nickname: 'JJAGU'
  },
  Images: [],
  Comments: []
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPostRequestAction = (data) => {
  return {
    type: ADD_POST_REQUEST,
    data
  }
}

export const addCommentRequestAction = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data
  }
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
        addPostError: null
      }
    case ADD_POST_FAILURE:
      return{
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: data.error
      }
    case ADD_COMMENT_REQUEST:
      return{
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      }
    case ADD_COMMENT_SUCCESS:
      return{
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        addCommentError: null
      }
    case ADD_COMMENT_FAILURE:
      return{
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: action.error
      }
    default:
      return state
  }
}

export default reducer