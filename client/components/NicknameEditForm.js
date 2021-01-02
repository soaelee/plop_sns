import React, { useMemo, useCallback } from 'react';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);
  const { user } = useSelector((state) => state.user);
  const nickname = useInput(user?.nickname || '');
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname.value,
    });
  }, [nickname.value]);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore="닉네임"
        value={nickname.value}
        onChange={nickname.handler}
        onSearch={onSubmit}
        enterButton="수정"
      />
    </Form>
  );
};

export default NicknameEditForm;
