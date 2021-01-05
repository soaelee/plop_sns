import React, { useCallback, useRef, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPostRequestAction, uploadImagesRequestAction, removeImageRequestAction } from '../reducers/post';

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
    if (!text.value || !text.value.trim()) {
      return alert('게시글을 작성하세요');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text.value);
    console.log(imagePaths, text.value);
    dispatch(addPostRequestAction(formData));
  }, [text.value, imagePaths]);

  const onChangeImages = useCallback((e) => {
    console.log(e.target.files);
    const imageFormData = new FormData();
    // 유사배열
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadImagesRequestAction(imageFormData));
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onRemoveImage = useCallback((data) => {
    console.log(data);
    dispatch(removeImageRequestAction(data));
  });

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text.value}
        onChange={text.handler}
        maxLength={148}
        placeholder="오늘의 흥미로운 이야기를 던져주세요."
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ style: 'right' }} htmlType="submit">PLOP</Button>
      </div>
      <div>
        {imagePaths.map((image, i) => (
          <div key={image} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${image}`} style={{ width: '200px' }} alt={image} />
            <div>
              <Button onClick={() => onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
