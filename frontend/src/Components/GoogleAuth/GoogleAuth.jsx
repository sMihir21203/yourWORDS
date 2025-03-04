import React, { useState } from 'react'
import { Button } from "../CompsIndex.js"
import { app } from './fireBase.js'
import Google from './Google.png'
import Loading from './Loading.png'
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
      const res = await API.post("/user/google_auth", userData, { withCredentials: true })
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
  return < Button
    type="button"
    urlIcon={loading ? Loading : Google}
    alt="Google"
    className='bg-base-100 w-71 h-10 text-xl mt-3 mb-1 hover:bg-gradient-to-r hover:from-blue-600  hover:via-cyan-50 hover:to-pink-600'
    onClick={googleClickHandler}
  />
}

export default GoogleAuth