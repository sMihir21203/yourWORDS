import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const DashBoardPrivateRoute = () => {
    const loggedInUser = useSelector(state=>state.user?.currentUser?.data?.loggedInUser)
  return loggedInUser ?  <Outlet/> : <Navigate to={'/sign-in'} /> 
}

export default DashBoardPrivateRoute