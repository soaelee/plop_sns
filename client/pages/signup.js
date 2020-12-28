import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { signupRequestAction } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;
const Signup = () => {
  const { signupLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const email = useInput('');
  const password = useInput('');
  const nickname = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    console.log(e.target.checked);
    setTermError(false);
  }, []);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password.value);
  }, [password.value]);

  const onSubmitForm = useCallback(() => {
    if (password.value !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }

    const data = {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    };
    console.log('hi');
    dispatch(signupRequestAction(data));
  }, [password.value, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>Signup | Plop</title>
      </Head>
      <AppLayout>
        <Form onFinish={onSubmitForm}>
          <div>
            <label htmlFor="user_email">이메일</label>
            <br />
            <Input name="user_email" type="email" required value={email.value} onChange={email.handler} />
          </div>
          <div>
            <label htmlFor="user_nickname">닉네임</label>
            <br />
            <Input name="user_nickname" required value={nickname.value} onChange={nickname.handler} />
          </div>
          <div>
            <label htmlFor="user_password">비밀번호</label>
            <br />
            <Input type="password" name="user_password" required value={password.value} onChange={password.handler} />
          </div>
          <div>
            <label htmlFor="user_password_check">비밀번호 확인</label>
            <br />
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
            {termError && <ErrorMessage style={{ color: 'red' }}>약관에 동의하셔야 합니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signupLoading}>가입하기</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
