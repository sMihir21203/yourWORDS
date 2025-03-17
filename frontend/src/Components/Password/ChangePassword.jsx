import React, { useEffect, useState } from 'react'
import { FaKey } from 'react-icons/fa'
import { Input, Button, Loader } from "../CompsIndex.js"
import { updateStart, updateSuccess, updateFailure, clearAllMessages } from "../../Store/User/userSlice.js"
import { useDispatch, useSelector } from 'react-redux'
import { API } from '../../API/API.js'

const ChangePassword = () => {

    const { loading, error: errorMsg, success: successMsg } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (errorMsg || successMsg) {
            setTimeout(() => {
                dispatch(clearAllMessages())
            }, 3000);
        }
    }, [errorMsg, successMsg, dispatch])

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: ""
    })

    // console.table(formData)
    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value.trim()
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.currentPassword) {
                return dispatch(updateFailure("Current password is required!"));
            }
            if (formData.currentPassword.length < 6) {
                return dispatch(updateFailure("Current password should be 6 characters!"));
            }
            if (!formData.newPassword) {
                return dispatch(updateFailure("New Password is required"));
            }
            if (formData.newPassword.length < 6) {
                return dispatch(updateFailure("New password should be 6 characters!"));
            }

            dispatch(updateStart());

            const response = await API.post("/user/update-password", formData);
            // console.log("API Response:", response);

            if (response.data) {
                dispatch(updateSuccess(response.data));
            }

            setFormData({ currentPassword: "", newPassword: "" })
        } catch (error) {
            setFormData({ currentPassword: "", newPassword: "" })
            // console.error("Error Updating Password:", error?.response?.data);
            dispatch(updateFailure(error?.response?.data?.message || "Something went wrong while changing password, please try again!"));
        }
    };

    return (

        <form
            onSubmit={handleOnSubmit}
            className='space-y-2 w-sm md:w-md flex flex-col items-center'>

            <Input
                icon={FaKey}
                type="password"
                placeholder="Current Password"
                id="currentPassword"
                onChange={handleOnChange}
                value={formData.currentPassword}
            />
            <Input
                icon={FaKey}
                type="password"
                placeholder="New Password"
                id="newPassword"
                onChange={handleOnChange}
                value={formData.newPassword}
            />
            <Button
                type="submit"
                style='imp'
                text={loading ? <Loader /> : "Update Password"}
                className='mt-4 min-w-full hover:pb-1'
            />
        </form>


    )
}

export default ChangePassword


