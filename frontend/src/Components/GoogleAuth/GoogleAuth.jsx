import React, { useState } from 'react'
import { Button, Loader } from "../CompsIndex.js"
import { FcGoogle } from "react-icons/fc"
import { app } from './fireBase.js'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useDispatch } from "react-redux"
import { signInSuccess } from "../../Store/User/userSlice.js"
import { API } from '../../API/API.js'
import { useNavigate } from 'react-router-dom'


const GoogleAuth = () => {
    const [loading, setLoading] = useState(false)
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const googleClickHandler = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })

        try {
            //authentication with google
            const googleResponse = await signInWithPopup(auth, provider)

            //data from googleResponse
            const userData = {
                name: googleResponse.user.displayName,
                email: googleResponse.user.email,
                googleImgUrl: googleResponse.user.photoURL
            }

            setLoading(true)
            const res = await API.post("/user/google-auth", userData, { withCredentials: true })
            const data = res.data

            // console.log("backendRes: ", data)
            if (data) {
                dispatch(signInSuccess(data))
                navigate("/")
            }

        } catch (error) {
            setLoading(false)
            console.log("Google Auth Error: ", error)
            await auth.signOut() //if backend fails clear firebase session
        }
    }
    return (
        <Button
            text={loading ? <Loader /> : <FcGoogle size={40} />}
            alt="Google"
            className="w-full h-10 flex items-center justify-center"
            onClick={googleClickHandler}
        />

    )
}

export default GoogleAuth