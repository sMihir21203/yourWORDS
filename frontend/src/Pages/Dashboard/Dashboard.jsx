import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { } from "react-redux"
import Sidebar from './Sidebar'
import Profile from './Profile'

const Dashboard = () => {

  const [tab, setTab] = useState("")
  const location = useLocation()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    // console.log(tabFromUrl)
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])


  return (
    <div className='md:flex'>
      <div><Sidebar/></div>
      {tab === 'profile' && <Profile/>}
    </div>
  )
}

export default Dashboard