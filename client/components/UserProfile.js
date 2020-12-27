import React, {useCallback} from 'react'
import { Card, Avatar, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'

const UserProfile = () => {
  const { user, logoutLoading } = useSelector((state)=>state.user)
  const dispatch = useDispatch();  
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="plop">PLOP<br/>0</div>,
        <div key="followings">팔로잉<br/>0</div>,
        <div key="followers">팔로워<br/>0</div>
      ]}
    >
      <Card.Meta 
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
      <Button onClick={onLogout} loading={logoutLoading}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
