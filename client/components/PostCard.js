import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons';
import { removePostRequestAction, likePostRequestAction, unlikePostRequestAction } from '../reducers/post';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleCommentForm = useCallback(() => {
    setCommentFormOpened(!commentFormOpened);
  }, [commentFormOpened]);

  const onUnlike = useCallback(() => {
    dispatch(unlikePostRequestAction(post.id));
  }, []);

  const onLike = useCallback(() => {
    dispatch(likePostRequestAction(post.id));
  }, []);
  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction(post.id));
  }, []);
  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20 }}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="replop" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="plop" onClick={onToggleCommentForm} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger" onClick={onRemovePost} loading={removePostLoading}>삭제</Button>
                  </>
                ) : <Button>신고</Button> }
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      { commentFormOpened && (
      <div>
        <CommentForm post={post} />
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
          )}
        />
      </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
export default PostCard;
