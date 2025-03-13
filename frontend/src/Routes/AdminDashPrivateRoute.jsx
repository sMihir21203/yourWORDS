import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminDashPrivateRoute = () => {
  const currentUser = useSelector(state=>state.user?.currentUser?.data?.loggedInUser)
  return currentUser ?  <Outlet/> : <Navigate to={'/sign_in'} /> 
}

export default AdminDashPrivateRoute