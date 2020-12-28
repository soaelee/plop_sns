import React, {useCallback, useEffect} from 'react'
import { Form, Input, Button } from 'antd'
import useInput from '../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { addCommentRequestAction } from '../reducers/post'

const CommentForm = ({post}) => {
  const commentText = useInput('')
  const { addCommentDone } = useSelector(state =>  state.post)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user?.id)

  useEffect(() => {
    if(addCommentDone){
      commentText.resetValue()
    } 
  }, [addCommentDone])
  const onSubmitComment = useCallback(() => {
    console.log("hi")
    const body = {
      content: commentText.value,
      postId: post.id,
      userId: user
    }
    dispatch(addCommentRequestAction(body))
  }, [commentText.value, user])

  return (
    <Form onFinish={onSubmitComment}style={{position: 'relative', marginBottom: 0}}>
        <Input.TextArea 
        value={commentText.value} 
        onChange={commentText.handler} 
        rows={4} 
        name="comment_text" 
        />

        <Button 
          type="primary" 
          htmlType="submit"
          // onClick={onSubmitComment}
        >PLOP!</Button>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}
export default CommentForm
