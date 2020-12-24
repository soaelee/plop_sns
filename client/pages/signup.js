import React, {useState, useCallback} from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import { Form, Input, Checkbox, Button } from 'antd'
import useInput from '../hooks/useInput'
import styled from 'styled-components'

const ErrorMessage = styled.div`
  color: red;
`
const Signup = () => {
  const id = useInput('')
  const password = useInput('')
  const nickname = useInput('')


  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password.value);
  }, [password.value])

  const onSubmit = useCallback(() => {
    if(password.value !== passwordCheck) {
      return setPasswordError(true)
    }
    if(!term){
      return setTermError(true)
    }
    console.log(id.value, nickname.value, password.value)
  }, [password.value, passwordCheck, term])
  
  return (
    <>
      <Head>
        <title>Signup | Plop</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmit}>
          <div>
            <label htmlFor="user_id">아이디</label>
            <br/>
            <Input name="user_id" required value={id.value} onChange={id.handler}/>
          </div>
          <div>
            <label htmlFor="user_nickname">닉네임</label>
            <br/>
            <Input name="user_nickname" required value={nickname.value} onChange={nickname.handler}/>
          </div>
          <div>
            <label htmlFor="user_password">비밀번호</label>
            <br/>
            <Input type="password" name="user_password" required value={password.value} onChange={password.handler}/>
          </div>
          <div>
            <label htmlFor="user_password_check">비밀번호 확인</label>
            <br/>
            <Input 
              type="password" 
              name="user_password_check" 
              required 
              value={passwordCheck} 
              onChange={onChangePasswordCheck}
            />
            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>
          <div>
            <Checkbox name="user_term" checked={term} onChange={onChangeTerm}>회원가입 약관은 없지만 그래도 뭔가 동의합니다.</Checkbox>
            {termError && <ErrorMessage style={{color: 'red'}}>약관에 동의하셔야 합니다.</ErrorMessage>}
          </div>
          <div style={{marginTop: 10}}>
            <Button type="primary" htmlType="submit">가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  )
}

export default Signup