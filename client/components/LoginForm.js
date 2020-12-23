import React, { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'


const ButtonWrapper = styled.div`
  margin-top: 10px;
`
// Component에 Props로 넘겨주는 함수는 항상 useCallback을 사용한다.
const LoginForm = ({setIsLogin}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")

  const onChangeId = useCallback(e => {
    setId(e.target.value);
  }, [])

  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, [])

  const onSubmitForm = useCallback(() => {
    // preventDefault적용 되어 있음
    console.log(id, password)
    setIsLogin(true)
  }, [id, password])
  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br/>
        <Input name="user-id" value={id} onChange={onChangeId}/>
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input.Password name="user-password" value={password} onChange={onChangePassword}/>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </Form>
    )
}

export default LoginForm
