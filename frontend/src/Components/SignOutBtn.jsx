import React from 'react'
import { Button } from './CompsIndex.js'
import { AiOutlineSelect } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { API } from '../API/API.js'
import { signOutFailure, signOutSuccess } from '../Store/User/userSlice.js'

const SignOutBtn = ({
    className = "",
    ...props
}) => {

    const dispatch = useDispatch()

    const SignOutHandler = async () => {
        try {
            const signOutedUser = await API.get("/user/sign-out")
            if (signOutedUser) {
                dispatch(signOutSuccess())
                window.location.href = "/sign-in"
            }
        } catch (error) {
            dispatch(signOutFailure(error.response.data.message || "User SignOut Issue!"))
        }
    }
    return (
        <Button
            onClick={SignOutHandler}
            icon={AiOutlineSelect}
            text="SignOut"
            className={`${className} flex items-center text-center justify-center w-25 mx-auto`}
            {...props}
        />
    )
}

export default SignOutBtn