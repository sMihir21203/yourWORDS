import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaUser } from "react-icons/fa"
import { AiFillMail } from 'react-icons/ai'
import { Button, Input, Logo, Container,GoogleAuth } from '../Components/CompsIndex.js'
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../Store/User/userSlice.js"
import { API } from "../API/API.js"


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const { loading, error: errorMsg } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg) {
      dispatch(signInFailure(null))
    }
  },[])

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }
  console.log(formData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password) {
      return dispatch(signInFailure('All Fields Are Required!'))
    }


    try {
      dispatch(signInStart())
      const res = await API.post("/user/sign_up", formData)

      const data = res.data;

      dispatch(signInSuccess(data))
      navigate('/sign-in')
      alert("SignUp Successfully")
    } catch (error) {
      if (error.response) {
        return dispatch(signInFailure(error.response.data.message || "Oops👀 Something went wrong. Please try again!"))
      } else {
        return dispatch(signInFailure("Oops👀 Something went wrong. Please try again!"));
      }
    }
  }

  return (
    <Container >
      {
        errorMsg && (
          <div
            role="alert"
            className="mb-2 md:mb-0 alert alert-error alert-soft flex justify-center text-center"
          >
            {errorMsg}
          </div>
        )
      }

      <div className='lg:ml-80 flex flex-col lg:flex-row items-center justify-items-center'>
        <div className='mt-4 lg:-mt-32 lg:space-y-8'>
          <Logo className='text-3xl lg:text-6xl' />
          <div className='hidden lg:inline text-xl font-semibold'>
            SignUp to Share <span className='font-extrabold'>YourWords...</span>
          </div>
        </div>

        <div className='mt-12 lg:ml-16'>

          <form onSubmit={handleOnSubmit}
            className=' space-y-2'>

            <Input label="Your Username" type="username" placeholder="Username" icon={FaUser} id="username" onChange={handleOnChange} />

            <Input label="Your E-Mail" type="email" placeholder="abcd@gmail.com" icon={AiFillMail} id="email" onChange={handleOnChange} />

            <Input label="Your Password" type="password" placeholder="********" icon={FaKey} id="password" onChange={handleOnChange} />

            <Button type="submit" text={loading ? "Loading...." : "Sign Up"} style='gradient' className='w-71 text-xl pb-2 mt-4' disabled={loading}>
            </Button>
            
          </form>
          <GoogleAuth/>
          <div >
            Already a User ?
            <Link to="/sign-in" className='ml-2 text-blue-600 link-hover text-md font-semibold' >Sign In</Link>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default SignUp