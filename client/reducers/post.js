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
  loadPostDetailLoading: false,
  loadPostDetailDone: false,
  loadPostDetailError: null,
  hasMorePosts: true,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  replopLoading: false,
  replopDone: false,
  replopError: null,

  singlePost: null,
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

export const LOAD_POST_DETAIL_REQUEST = 'LOAD_POST_DETAIL_REQUEST';
export const LOAD_POST_DETAIL_SUCCESS = 'LOAD_POST_DETAIL_SUCCESS';
export const LOAD_POST_DETAIL_FAILURE = 'LOAD_POST_DETAIL_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const REMOVE_IMAGE_REQUEST = 'REMOVE_IMAGE_REQUEST';

export const REPLOP_REQUEST = 'REPLOP_REQUEST';
export const REPLOP_SUCCESS = 'REPLOP_SUCCESS';
export const REPLOP_FAILURE = 'REPLOP_FAILURE';
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

export const loadPostRequestAction = (data) => ({
  type: LOAD_POST_REQUEST,
  data,
});

export const loadPostDetailRequestAction = (data) => ({
  type: LOAD_POST_DETAIL_REQUEST,
  data,
});

export const likePostRequestAction = (data) => ({
  type: LIKE_POST_REQUEST,
  data,
});

export const unlikePostRequestAction = (data) => ({
  type: UNLIKE_POST_REQUEST,
  data,
});

export const uploadImagesRequestAction = (data) => ({
  type: UPLOAD_IMAGES_REQUEST,
  data,
});

// 동기 액션이기 때문에 한가지 액션만 만들면 됨
export const removeImageRequestAction = (data) => ({
  type: REMOVE_IMAGE_REQUEST,
  data,
});

export const replopRequestAction = (data) => ({
  type: REPLOP_REQUEST,
  data,
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
      draft.imagePaths = [];
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
      draft.mainPosts = draft.mainPosts.filter((post) => post.id !== action.data.PostId);
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
      draft.mainPosts = draft.mainPosts.concat(action.data);
      draft.hasMorePosts = action.data.length === 10;
      // 50개보다 많아지면 false, 안가져오겠다!
      break;
    case LOAD_POST_FAILURE:
      draft.loadPostLoading = false;
      draft.loadPostDone = false;
      draft.loadPostError = action.error;
      break;
    case LOAD_POST_DETAIL_REQUEST:
      draft.loadPostDetailLoading = true;
      draft.loadPostDetailDone = false;
      draft.loadPostDetailError = null;
      break;
    case LOAD_POST_DETAIL_SUCCESS:
      draft.loadPostDetailLoading = false;
      draft.loadPostDetailDone = true;
      draft.loadPostDetailError = null;
      draft.singlePost = action.data;
      break;
    case LOAD_POST_DETAIL_FAILURE:
      draft.loadPostDetailLoading = false;
      draft.loadPostDetailDone = false;
      draft.loadPostDetailError = action.error;
      break;
    case LIKE_POST_REQUEST:
      draft.likePostLoading = true;
      draft.likePostDone = false;
      draft.likePostError = null;
      break;
    case LIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers.push({ id: action.data.UserId });
      draft.likePostLoading = false;
      draft.likePostDone = true;
      draft.likePostError = null;
      break;
    }
    case LIKE_POST_FAILURE:
      draft.likePostLoading = false;
      draft.likePostDone = false;
      draft.likePostError = action.error;
      break;
    case UNLIKE_POST_REQUEST:
      draft.unlikePostLoading = true;
      draft.unlikePostDone = false;
      draft.unlikePostError = null;
      break;
    case UNLIKE_POST_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
      post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
      draft.unlikePostLoading = false;
      draft.unlikePostDone = true;
      draft.unlikePostError = null;
      break;
    }
    case UNLIKE_POST_FAILURE:
      draft.unlikePostLoading = false;
      draft.unlikePostDone = false;
      draft.unlikePostError = action.error;
      break;
    case UPLOAD_IMAGES_REQUEST:
      draft.uploadImagesLoading = true;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = null;
      break;
    case UPLOAD_IMAGES_SUCCESS:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = true;
      draft.uploadImagesError = null;
      draft.imagePaths = action.data;
      break;
    case UPLOAD_IMAGES_FAILURE:
      draft.uploadImagesLoading = false;
      draft.uploadImagesDone = false;
      draft.uploadImagesError = action.error;
      break;
    case REMOVE_IMAGE_REQUEST:
      draft.imagePaths.splice(action.data, 1);
      break;
    case REPLOP_REQUEST:
      draft.replopLoading = true;
      draft.replopDone = false;
      draft.replopError = null;
      break;
    case REPLOP_SUCCESS:
      draft.replopLoading = false;
      draft.replopDone = true;
      draft.replopError = null;
      draft.mainPosts.unshift(action.data);
      break;
    case REPLOP_FAILURE:
      draft.replopLoading = false;
      draft.replopDone = false;
      draft.replopError = action.error;
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
