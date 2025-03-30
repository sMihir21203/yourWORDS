import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Comments, Dash, Profile, Users } from './DashIndex.js'
import { MyPosts, CreatePost } from "./Posts/PostIndex.js"
import { useSelector } from 'react-redux'
import { Container, Sidebar } from '../../Components/CompsIndex.js'

const Dashboard = () => {
  const admin = useSelector(state => state.user.currentUser.data.admin)
  const [tab, setTab] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')

    if (tabFromUrl) {
      if (tabFromUrl === "users" && !admin) {
        navigate("/dashboard?tab=profile", { replace: true })
      }
      else {
        setTab(tabFromUrl);
      }
    }
  }, [location.search, admin, navigate])


  return (
    <>
      <Sidebar />
      <Container>
        {tab === 'profile' && <Profile />}
        {tab === 'my-posts' && <MyPosts />}
        {tab === 'create-post' && <CreatePost />}
        {tab === 'comments' && <Comments />}
        {tab === 'dash' && <Dash />}
        {tab === 'users' && admin && <Users />}
      </Container>
    </>
  )
}

export default Dashboard