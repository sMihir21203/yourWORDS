import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PostPrivateRoute = () => {
    const loggedInUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser)

    return loggedInUser ? <Outlet /> : <Navigate to={"/"} />;
}

export default PostPrivateRoute