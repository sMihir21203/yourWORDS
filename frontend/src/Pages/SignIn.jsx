import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, GoogleAuth, Container } from '../Components/CompsIndex.js'
import { FaUser, FaKey } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../Store/User/userSlice.js"
import { API } from "../API/API.js"



const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const { loading, error: errorMsg } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg) {
      dispatch(signInFailure(null))
    }
  }, [])

  const clearError = setTimeout(() => setErrorMsg(null), 2000);
  
  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }
  // console.log(formData)

  const handleOnSubmit = async (e) => {

    e.preventDefault();

    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("All Fields Are Required!"))
    }

    try {
      dispatch(signInStart());
      const res = await API.post("/user/sign_in", formData)

      const data = res.data
      // console.log(data)

      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "oops something went wrong while signIn please try again!"))
    }
  }
  return (
    <Container>
      <div className="flex flex-col">
        {
          errorMsg && (
            <div
              role="alert"
              className="alert alert-error alert-soft flex justify-center text-center mb-12"
            >
              {`👀 ${errorMsg}`}
            </div>
          )
        }
        <div className='hero-content flex-col lg:flex-row'>
          <div className='text-center lg:text-left lg:mr-2 -mt-16'>
            <h1 className="text-5xl font-bold"><span className='bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text'>signIn </span>Now!</h1>
            <p className='py-6'>
              to Share <span className='font-extrabold'>YourWords...</span>
            </p>
          </div>
          <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl'>
            <div className='card-body ml-5'>
              <fieldset className='fieldset'>
                <form onSubmit={handleOnSubmit} className='space-y-2'>

                  <Input label="Your Username" type="username" placeholder="Username" icon={FaUser} id="username" onChange={handleOnChange} />

                  <Input label="Your Password" type="password" placeholder="********" icon={FaKey} id="password" onChange={handleOnChange} />
                  <div><a className="link link-hover ml-1 mt-1">Forgot password?</a></div>
                  <Button type="submit" text={loading ? "Loading...." : "Sign In"} style='gradient' className='w-71 text-xl pb-2 mt-2' disabled={loading} />

                  <GoogleAuth />
                  <p className='pl-1'>
                    Don't Have An Account ?
                    <Link to="/sign_up" className='ml-2 text-blue-600 link-hover  font-semibold' >Sign Up</Link>
                  </p>
                </form>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SignIn