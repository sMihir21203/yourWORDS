import React, { useState } from 'react'
import { FaKey } from 'react-icons/fa'
import { Button, Container, Input, Loader } from '../CompsIndex.js'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../../API/API.js'

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        newPass: "",
        confirmNewPass: ""
    })
    const [successMsg, setSuccessMsg] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()
    const { resetPassToken } = useParams()
    console.log(resetPassToken)

    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            if (!(formData.newPass === formData.confirmNewPass)) {
                console.log("New Password and Confirm New Password Must Be Same")
            }

            const { data } = await API.post(`/user/${resetPassToken}/reset-pass`, formData)
            if (data) {
                setSuccessMsg(true)
                setTimeout(() => {
                    navigate("/sign-in")
                }, 5000);
            }
        } catch (error) {
            console.error(error)
            setErrorMsg(error?.response?.data?.message || "failed to reset password")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Container>
            <div className='card  w-sm  shrink-0 shadow-2xl'>
                <div className='card-body flex items-center justify-center'>
                    <fieldset className='fieldset w-full'>
                        {
                            errorMsg
                                ? <p className='text-lg font-semibold text-center text-error'>{errorMsg}</p>
                                : successMsg
                                    ? <p className='text-lg font-semibold text-center text-success'>Password reset successfully! <br />signIn Now To Your Account!</p>
                                    : <form
                                        onSubmit={handleOnSubmit}
                                        className='w-full flex flex-col items-center space-y-4'
                                    >
                                        <p className='text-xl font-semibold'>Reset Password</p>

                                        <Input
                                            required
                                            label="New Password"
                                            type="password"
                                            placeholder="New Password"
                                            icon={FaKey}
                                            id="newPass"
                                            onChange={handleOnChange}
                                            className="w-full"
                                            minLength="6"
                                            title="Must be more than 6 characters"
                                        />

                                        <Input
                                            required
                                            label="Confirm New Password"
                                            type="password"
                                            placeholder="Confirm New Password"
                                            icon={FaKey}
                                            id="confirmNewPass"
                                            onChange={handleOnChange}
                                            className="w-full"
                                            minLength="6"
                                            title="Must be more than 6 characters"
                                        />
                                        <Button
                                            type="submit"
                                            style='imp'
                                            text={loading ? <Loader /> : "Reset Password"}
                                            className='mt-3'
                                        />
                                    </form>
                        }

                    </fieldset>
                </div>
            </div>
        </Container>
    )
}

export default ResetPassword