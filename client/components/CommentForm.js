import React, {useCallback} from 'react'
import { Form, Input, Button } from 'antd'
import useInput from '../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

const CommentForm = ({post}) => {
  const commentText = useInput('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user?.id)

  const onSubmitComment = useCallback(() => {
    console.log(user, post.id)
  }, [commentText.value, user])
  return (
    <Form onFinish={onSubmitComment} style={{position: 'relative', marginBottom: 0}}>
      <Form.Item>
        <Input.TextArea value={commentText.value} onChange={commentText.handler} rows={4} />
        <Button type="primary" htmlType="submit" style={{position: 'absolute', right: 0, bottom : -40}}>PLOP!</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}
export default CommentForm
