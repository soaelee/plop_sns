import React, { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import useInput from '../hooks/useInput'

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const FormWrapper = styled(Form)`
  padding: 10px;

`
// Component에 Props로 넘겨주는 함수는 항상 useCallback을 사용한다.
const LoginForm = ({setIsLogin}) => {
  const id = useInput("");
  const password = useInput("")

  const onSubmitForm = useCallback(() => {
    // preventDefault적용 되어 있음
    console.log(id.value, password.value)
    setIsLogin(true)
  }, [id.value, password.value])
  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br/>
        <Input name="user-id" value={id.value} onChange={id.handler}/>
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input.Password name="user-password" value={password.value} onChange={password.handler}/>
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </ButtonWrapper>
    </FormWrapper>
    )
}

export default LoginForm
