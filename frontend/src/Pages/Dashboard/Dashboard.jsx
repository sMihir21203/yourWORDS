import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Sidebar, Profile, MyPosts, CreatePost, Users } from './DashIndex.js'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const admin = useSelector(state => state.user.currentUser.data.admin)
  const [tab, setTab] = useState("")
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    // console.log(tabFromUrl)
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
    <div className='md:flex  md:flex-row'>
      <Sidebar />
      {tab === 'profile' && <Profile />}
      {tab === 'my-posts' && <MyPosts />}
      {tab === 'create-post' && <CreatePost />}
      {tab === 'users' && admin && <Users />}
    </div>
  )
}

export default Dashboard