//dummy data

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'JJAGU',
    },
    content: 'First Content',
    Images: [{
      src: 'https://img6.yna.co.kr/photo/cms/2019/05/02/02/PCM20190502000402370_P4.jpg'
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
  postAdded: false
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

const ADD_POST = 'ADD_POST'

export const addPost = () => {
  return {
    type: ADD_POST
  }
}


const reducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    default:
      return state
  }
}

export default reducer