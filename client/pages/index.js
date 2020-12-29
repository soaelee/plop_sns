import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { loadPostRequesstAction } from '../reducers/post';

const Home = () => {
  // 무한 스크롤 : mounted 됐을 때, useEffect 이용해서 scroll 이벤트
  const dispatch = useDispatch();
  const { loginDone } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  const { hasMorePosts, loadPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    // post가 50개 이하이고, loadPost 액션이 실행중이 아닐 때
    if (hasMorePosts && !loadPostLoading) {
      dispatch(loadPostRequesstAction());
    }
  }, []);

  const onScroll = () => {
    const { scrollY } = window; // 윈도우 맨위의 위치
    const { clientHeight } = document.documentElement; // 화면에 보이는 뷰의 높이
    const { scrollHeight } = document.documentElement; // 윈도우 전체의 높이(scroll)
    if (scrollY + clientHeight > scrollHeight - 400) {
      if (hasMorePosts && !loadPostLoading) {
        dispatch(loadPostRequesstAction());
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      { loginDone && <PostForm /> }
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export default Home;
