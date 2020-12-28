import React from 'react'
import AppLayout from '../components/AppLayout'
import { useSelector } from 'react-redux'
import PostForm from '../components/PostForm'
import PostCard from '../components/PostCard'
const Home = () => {

  const { loginDone } = useSelector((state) => state.user)
  const { mainPosts } = useSelector((state) => state.post)

  return (
    <AppLayout>

      { loginDone && <PostForm /> }
      {mainPosts.map(post => <PostCard key={post.id} post={post}/>)}
    </AppLayout>
  )
}

export default Home