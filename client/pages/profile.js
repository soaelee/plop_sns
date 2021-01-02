import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowerList from '../components/FollowerList';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // user정보가 없으면 리다이렉트
    if (!user) {
      router.push('/');
    }
  }, [user]);
  // user 정보가 없으면 null 반환
  if (!user) {
    console.log('로그인이 필요한 기능입니다.');
    return null;
  }

  return (
    <>
      <Head>
        <title>Profile | Plop</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={user.Followings} />
        <FollowerList header="팔로워 목록" data={user.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
