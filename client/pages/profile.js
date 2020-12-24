import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowerList from '../components/FollowerList'
import FollowList from '../components/FollowList'

const Profile = () => {

  //dummy data
  const followerList = [{nickname: '짜구'}, {nickname: '달소'}]
  const followingList = [{nickname: '짜구'}, {nickname: '달소'}]
  return (
    <>
      <Head>
        <title>Profile | Plop</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList}/>
        <FollowerList header="팔로워 목록" data={followerList}/>      
      </AppLayout>
    </>
  )
}

export default Profile