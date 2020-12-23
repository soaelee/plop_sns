import React, {useCallback} from 'react'
import { Card, Avatar, Button } from 'antd'

const UserProfile = ({setIsLogin}) => {

  const onLogout = useCallback(() => {
    setIsLogin(false)
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
        avatar={<Avatar>SL</Avatar>}
        title="SoaeLee"
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
