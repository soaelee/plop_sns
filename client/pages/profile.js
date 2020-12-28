import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowerList from '../components/FollowerList';
import FollowList from '../components/FollowList';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

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
