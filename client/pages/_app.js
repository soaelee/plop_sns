import React from 'react'
import PropTypes from 'prop-types'
import Head from'next/head'
import 'antd/dist/antd.css'

const App = ({Component}) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Plop</title>
      </Head>
      <Component />
    </>
  )
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App

//공통적인 부분