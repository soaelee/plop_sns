import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';
// dummy data

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  hasMorePosts: true,
};

// react-virtualized 한번 사용해보자! (infiniteloader사용해서)
// export const generateDummyPost = (number) => (

//   Array(number).fill().map(() => ({
//     id: shortId.generate(),
//     User: {
//       id: shortId.generate(),
//       nickname: faker.name.findName(),
//     },
//     content: faker.lorem.paragraph(),
//     Images: [{
//       src: faker.image.image(),
//     }],
//     Comments: [{
//       User: {
//         id: shortId.generate(),
//         nickname: faker.name.findName(),
//       },
//       content: faker.lorem.sentence(),
//     }],
//   }))
// );

const dummyComment = (data) => ({
  id: data.postId,
  content: data.content,
  User: {
    id: data.userId,
    nickname: 'jjagu',
  },
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'JJAGU',
  },
  Images: [],
  Comments: [],
});

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removePostRequestAction = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const loadPostRequesstAction = () => ({
  type: LOAD_POST_REQUEST,
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) => produce(state, (draft) => {
  // state가 draft됨
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostError = null;
      draft.addPostDone = false;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostError = null;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      draft.addPostDone = false;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentError = null;
      draft.addCommentDone = false;
      break;
    case ADD_COMMENT_SUCCESS: {
      // 메인포스트 중에 해당포스트를 찾아 참조변수에 담음, 해당 변수의 코멘트에 맨 앞에다가 더미 데이터를 더해줌
      const post = draft.mainPosts.find(((v) => v.id === action.data.PostId));
      post.Comments.unshift(action.data);
      draft.addCommentLoading = false;
      draft.addCommentError = null;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      draft.addCommentDone = false;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.removePostError = null;
      draft.mainPosts = draft.mainPosts.filter((post) => post.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostDone = false;
      draft.removePostError = action.error;
      break;
    case LOAD_POST_REQUEST:
      draft.loadPostLoading = true;
      draft.loadPostDone = false;
      draft.loadPostError = null;
      break;
    case LOAD_POST_SUCCESS:
      draft.loadPostLoading = false;
      draft.loadPostDone = true;
      draft.loadPostError = null;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePosts = draft.mainPosts.length < 50;
      // 50개보다 많아지면 false, 안가져오겠다!
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostDone = false;
      draft.loadPostError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;

// {
//   id: 1,
//   User: {
//     id: 1,
//     nickname: 'JJAGU',
//   },
//   content: 'First Content #Hash #Tag',
//   Images: [{
//     id: shortId.generate(),
//     src: 'https://img6.yna.co.kr/photo/cms/2019/05/02/02/PCM20190502000402370_P4.jpg',
//   }, {
//     id: shortId.generate(),
//     src: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2020/10/PS20100800026.jpg',
//   }, {
//     id: shortId.generate(),
//     src: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2020/10/PS20100800026.jpg',
//   }],
//   Comments: [{
//     id: shortId.generate(),
//     User: {
//       id: shortId.generate(),
//       nickname: 'nero',
//     },
//     content: 'Wow! cool!!!!',
//   }, {
//     User: {
//       id: shortId.generate(),
//       nickname: 'babo',
//     },
//     content: 'nice',
//   }],
// }
