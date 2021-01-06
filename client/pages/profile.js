import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { loadFollowingsRequestAction, loadFollowersRequestAction, loadMyInfoRequestAction } from '../reducers/user';
import wrapper from '../store/configureStore';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // user정보가 없으면 리다이렉트
    if (!(user && user.id)) {
      router.push('/');
    }
  }, [user && user.id]);

  if (!user) {
    return '내 정보 로딩중...';
  }
  return (
    <>
      <Head>
        <title>Profile | Plop</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={user.Followings} />
        <FollowList header="팔로워" data={user.Followers} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(END);
  console.log('getServerSideProps End');
  await context.store.sagaTask.toPromise();
});

export default Profile;
