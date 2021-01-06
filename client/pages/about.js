import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';
import { loadUserRequestAction } from '../reducers/user';

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Head>
        <title>About | Plop</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="plop">
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
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="플롭 매니아"
            />
          </Card>
        )
        : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch(loadUserRequestAction(1));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
