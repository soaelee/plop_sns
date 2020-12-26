import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Card, Button, Popover, Avatar, List, Comment } from 'antd'
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons'
import PostImages from './PostImages'
import CommentForm from './CommentForm'
const PostCard = ({post}) => {

  const id = useSelector((state) => state.user.user?.id)

  const [liked, setLiked] = useState(false)
  const [commentFormOpened, setCommentFormOpened] = useState(false)

  const onToggleLike = useCallback(() => {
    setLiked(!liked)
  }, [liked]);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened(!commentFormOpened)
  }, [commentFormOpened])
  return (
    <div style={{marginBottom : 20}}>
        <Card
          cover={post.Images[0] && <PostImages images={post.Images}/>}
          actions={[
            <RetweetOutlined key="replop"/>,
            liked ?
              <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
              : <HeartOutlined key="heart" onClick={onToggleLike}/>,
            <MessageOutlined key="plop" onClick={onToggleCommentForm}/>,
            <Popover key="more" content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : <Button>신고</Button> }
              </Button.Group>
            )}>
              <EllipsisOutlined />
            </Popover>
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
            title={post.User.nickname}
            description={post.content} />
          </Card>
          { commentFormOpened && (
            <div>
              <CommentForm post={post}/>
              <List 
                header={`${post.Comments.length}개의 댓글`}
                itemLayout="horizontal"
                dataSource={post.Comments}
                renderItem={(item) => (
                  <li>
                    <Comment
                      author={item.User.nickname}
                      avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                      content={item.content}
                    />
                  </li>
                )} />
            </div>
          )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired
}
export default PostCard
