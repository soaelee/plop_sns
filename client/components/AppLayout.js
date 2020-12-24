import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Menu, Input, Row, Col } from 'antd'
import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`
const AppLayout = ({children}) => {
  //dummy data
  // const [isLogin, setIsLogin] = useState(false);

  const { isLogin } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>PLOP</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>  
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        {/* Column간의 Padding : 8px */}
        {/* BREAKPOINT : xs - mobile, sm - tablet, md - desktop */}
        <Col xs={24} md={6}>
          {isLogin ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a 
            href="https://soae.jjagu.com" 
            target="_blank" 
            rel="noreferrer noopener"
          >
            Made by SoaeLee
          </a>
        </Col>
      </Row>      
    </div>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired
}
export default AppLayout
