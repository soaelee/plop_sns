import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPostRequestAction } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const imageInput = useRef();
  const text = useInput('');

  useEffect(() => {
    if (addPostDone) {
      text.resetValue();
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction(text.value));
  }, [text.value]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text.value}
        onChange={text.handler}
        maxLength={148}
        placeholder="오늘의 흥미로운 이야기를 던져주세요."
      />
      <div>
        <input type="file" multiple hidden id="fileUpload" ref={imageInput} />
        <Button id="fileUpload" onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ style: 'right' }} htmlType="submit">PLOP</Button>
      </div>
      <div>
        {imagePaths.map((image) => (
          <div key={image} style={{ display: 'inline-block' }}>
            <img src={image} style={{ width: '200px' }} alt={image} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
