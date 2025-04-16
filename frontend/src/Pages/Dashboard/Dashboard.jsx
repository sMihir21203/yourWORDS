import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminDash, AllComments, AllPosts, AllUsers, Comments, Dash, Profile } from './DashIndex.js'
import { UserComments, UserPosts, UserProfile } from './UserPages/UserPagesIndex.js'
import { MyPosts, ShareWORDS } from "./Posts/PostIndex.js"
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
      const isAdminTab = ['all-users', 'admin-dash', 'all-comments', 'all-posts'].includes(tabFromUrl) ||
                         tabFromUrl.startsWith('profile/') || 
                         tabFromUrl.startsWith('posts/') ||
                         tabFromUrl.startsWith('comments/')

      if (isAdminTab && !admin) {
        navigate("/dashboard?tab=profile", { replace: true })
      } else {
        setTab(tabFromUrl)
      }
    }
  }, [location.search, admin, navigate])

  // Extract userId if tab is dynamic
  const userId = tab.includes('/') ? tab.split('/')[1] : null

  return (
    <>
      <Sidebar />
      <Container>
        {tab === 'profile' && <Profile />}
        {tab === 'my-posts' && <MyPosts />}
        {tab === 'share-words' && <ShareWORDS />}
        {tab === 'comments' && <Comments />}
        {tab === 'dash' && <Dash />}
        {tab === 'admin-dash' && <AdminDash />}
        {tab === 'all-users' && admin && <AllUsers />}
        {tab === 'all-comments' && admin && <AllComments />}
        {tab === 'all-posts' && admin && <AllPosts />}
        {tab.startsWith('profile/') && admin && <UserProfile userId={userId} />}
        {tab.startsWith('posts/') && admin && <UserPosts userId={userId} />}
        {tab.startsWith('comments/') && admin && <UserComments userId={userId} />}
      </Container>
    </>
  )
}

export default Dashboard
