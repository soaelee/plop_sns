import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { followRequestAction, unfollowRequestAction } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const [follow, setFollow] = useState(true);
  const { user, followLoading, unfollowLoading } = useSelector((state) => state.user);
  const isFollowing = user?.Followings?.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unfollowRequestAction(post.User.id));
    } else {
      dispatch(followRequestAction(post.User.id));
    }
  });

  useEffect(() => {
    user.Followers?.forEach((follower) => {
      if (follower.nickname === post.User.nickname) {
        setFollow(false);
      }
    });
  }, [post.User.followers]);
  return (
    <Button loading={followLoading || unfollowLoading} type="primary" onClick={onClickButton}>
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
