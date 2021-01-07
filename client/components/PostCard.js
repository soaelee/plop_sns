import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import { EllipsisOutlined, HeartOutlined, MessageOutlined, RetweetOutlined, HeartTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import moment from 'moment';
import { removePostRequestAction, likePostRequestAction, unlikePostRequestAction, replopRequestAction } from '../reducers/post';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user?.id);
  const { removePostLoading } = useSelector((state) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened(!commentFormOpened);
  }, [commentFormOpened]);

  const onUnlike = useCallback(() => {
    dispatch(unlikePostRequestAction(post.id));
  }, [id]);

  const onLike = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch(likePostRequestAction(post.id));
  }, [id]);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch(removePostRequestAction(post.id));
  }, [id]);

  const onReplop = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다.');
    }
    dispatch(replopRequestAction(post.id));
  }, [id]);

  const liked = post?.Likers.find((v) => v.id === id);

  return (
    <div style={{ marginBottom: 20, cursor: 'pointer' }}>
      <Link href={`/post/${post.id}`}>
        <a>
          <Card
            cover={post.Images[0] && <PostImages images={post.Images} />}
            actions={[
              <RetweetOutlined key="replop" onClick={onReplop} />,
              liked
                ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnlike} />
                : <HeartOutlined key="heart" onClick={onLike} />,
              <MessageOutlined key="comment" onClick={onToggleComment} />,
              <Popover
                key="more"
                content={(
                  <Button.Group>
                    {id && post.User.id === id
                      ? (
                        <>
                          <Button>수정</Button>
                          <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                        </>
                      )
                      : <Button>신고</Button>}
                  </Button.Group>
              )}
              >
                <EllipsisOutlined />
              </Popover>,
            ]}
            title={post.ReplopId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
            extra={id && <FollowButton post={post} />}
          >
            {post.ReplopId && post.Replop
              ? (
                <Card
                  cover={post.Replop.Images[0] && <PostImages images={post.Replop.Images} />}
                >
                  <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                  <Card.Meta
                    avatar={<Link href={`/user/${post.Replop.User.id}`}><a><Avatar>{post.Replop.User.nickname[0]}</Avatar></a></Link>}
                    title={post.Replop.User.nickname}
                    description={<PostCardContent postData={post.Replop.content} />}
                  />
                </Card>
              )
              : (
                <>
                  <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>

                  <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content} />}
                  />
                </>
              )}
          </Card>
          {commentFormOpened && (
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
        </a>
      </Link>
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
    ReplopId: PropTypes.number,
    Replop: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
export default PostCard;
