import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';
import wrapper from '../store/configureStore';

// next-redux-wrapper는 provider로 감싸줄 필요가 없음

const App = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>Plop</title>
    </Head>
    <Component />
  </>
);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
// 공통적인 부분
