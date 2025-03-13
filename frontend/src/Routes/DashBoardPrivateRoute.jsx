import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const DashBoardPrivateRoute = () => {
    const currentUser = useSelector(state=>state.user?.currentUser?.data?.loggedInUser)
  return currentUser ?  <Outlet/> : <Navigate to={'/sign_in'} /> 
}

export default DashBoardPrivateRoute