import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { END } from 'redux-saga';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import { signupRequestAction, loadMyInfoRequestAction } from '../reducers/user';
import wrapper from '../store/configureStore';

const ErrorMessage = styled.div`
  color: red;
`;
const Signup = () => {
  const { signupLoading, signupDone, signupError, user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      router.push('/');
    }
  }, [user && user.id]);

  useEffect(() => {
    if (signupDone) {
      router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  });
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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(END);
  console.log('getServerSideProps End');
  await context.store.sagaTask.toPromise();
});
export default Signup;
