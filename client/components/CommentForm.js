import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { addCommentRequestAction } from '../reducers/post';

const CommentForm = ({ post }) => {
  const commentText = useInput('');
  const { addCommentDone, addCommentLoading, addCommentError } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user?.id);

  useEffect(() => {
    if (addCommentError) {
      alert(addCommentError);
    }
  }, [addCommentError]);

  useEffect(() => {
    if (addCommentDone) {
      commentText.resetValue();
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    const body = {
      content: commentText.value,
      postId: post.id,
      userId: user,
    };
    console.log(body);
    dispatch(addCommentRequestAction(body));
  }, [commentText.value, user]);

  return (
    <Form onFinish={onSubmitComment} style={{ position: 'relative', marginBottom: 0 }}>
      <Input.TextArea
        value={commentText.value}
        onChange={commentText.handler}
        rows={4}
        name="comment_text"
      />

      <Button
        type="primary"
        htmlType="submit"
        style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }}
        loading={addCommentLoading}
      >
        PLOP!

      </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentForm;
