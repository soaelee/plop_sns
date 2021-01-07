import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar } from 'antd';
import axios from 'axios';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import { loadMyInfoRequestAction, loadUserRequestAction } from '../../reducers/user';
import { loadUserPostsRequestAction } from '../../reducers/post';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadpostLoading } = useSelector((state) => state.post);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 400
      ) {
        if (hasMorePosts && !loadpostLoading) {
          dispatch(loadUserPostsRequestAction({
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          }));
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                PLOP
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{post.Replop.User.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>
        )
        : null}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadUserPostsRequestAction({
    data: context.params.id,
    lastId: 0,
  }));
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadUserRequestAction(context.params.id));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  console.log('getState', context.store.getState().post.mainPosts);

  return { props: {} };
});
export default User;
