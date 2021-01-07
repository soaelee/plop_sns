import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';
import useSWR from 'swr';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import wrapper from '../store/configureStore';
import { loadMyInfoRequestAction } from '../reducers/user';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    // user정보가 없으면 리다이렉트
    if (!(user && user.id)) {
      router.push('/');
    }
  }, [user && user.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, [followingsLimit]);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, [followersLimit]);

  if (!user) {
    return '내 정보 로딩중...';
  }

  if (followerError || followingError) {
    console.error(followingError || followerError);
    return '팔로잉/팔로워 로딩 중 에러 발생';
  }
  return (
    <>
      <Head>
        <title>Profile | Plop</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingError && !followingsData} />
        <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followerError && !followersData} />
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
