import React from 'react'
import { app, Button } from "../CompsIndex.js"
import Google from './Google.png'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {useDispatch} from "react-redux"
import {signInSuccess} from "../../Store/User/userSlice.js"
import { API } from '../../API/API.js'
import { useNavigate } from 'react-router-dom'


const GoogleAuth = () => {
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

      const res = await API.post("/user/google_auth",userData,{withCredentials:true})
      const data = res.data

      console.log("backendRes: ",data)
      if(res.status === 200 || res.status === 201){
        dispatch(signInSuccess(data))
        console.log("redux data: ",data)
        navigate("/")
      }

    } catch (error) {
      console.log("Google Auth Error: ",error)
      await auth.signOut() //if backend fails clear firebase session
    }
  }
  return < Button
    type="button"
    urlIcon={Google}
    alt="Google"
    className='bg-base-100 w-71 h-10 text-xl mt-3 mb-1 hover:bg-gradient-to-r hover:from-blue-600  hover:via-cyan-50 hover:to-pink-600'
    onClick={googleClickHandler}
  />
}

export default GoogleAuth