import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPostRequestAction } from '../reducers/post';
import { loadMyInfoRequestAction } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
  // 무한 스크롤 : mounted 됐을 때, useEffect 이용해서 scroll 이벤트
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const { hasMorePosts, loadPostLoading, replopError } = useSelector((state) => state.post);

  useEffect(() => {
    if (replopError) {
      alert(replopError);
    }
  }, [replopError]);

  useEffect(() => {
    function onScroll() {
      //  pageYOffset
      if (
        window.pageYOffset + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPostRequestAction(lastId));
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading, mainPosts]);

  return (
    <AppLayout>
      { user && <PostForm /> }
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

// 서버사이드 렌더링 : 프론트 서버가 직접 요청하기 때문에 withCredentials문제 다시 발생
// (기존에는 브라우저에서 보내줬음)
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  // 서버일때와 쿠키가 있을 때만 cookie 넣어놓기
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadPostRequestAction());
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Home;
