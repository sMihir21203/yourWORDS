import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Logo, Button, Input, Container } from '../Components/CompsIndex.js'
import { FaUser, FaKey, FaDiscourse } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure } from "../Store/User/userSlice.js"
import {API} from "../API/API.js"


const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const { loading, error: errorMsg } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }
  console.log(formData)

  const handleOnSubmit = async (e) => {

    e.preventDefault();

    if (!formData.username || !formData.password) {
      return dispatch(signInFailure("All Fields Are Required!"))
    }

    try {
      dispatch(signInStart());
      const res = await API.post("/sign-in", formData)

      const data = res.data
      console.log(data)
      
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      console.error(error)
      if(error.response){
        return dispatch(signInFailure(error.response.data.message || "Oops👀 Something went wrong. Please try again!"))
      }else{
      return dispatch(signInFailure("Oops👀 Something went wrong. Please try again!"));
    }
  }
  }
  return (
    <Container>
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
      <div className='lg:ml-70 flex flex-col lg:flex-row'>
        <div className='lg:mt-20 lg:space-y-8'>
          <Logo className='ml-22 md:ml-28 lg:ml-0 text-4xl md:5xl lg:text-6xl' />
          <div className='hidden lg:inline text-xl font-semibold'>
            SignUp to Share <span className='font-extrabold'>YourWords...</span>
          </div>
        </div>
        <div className='mt-13 lg:ml-24'>

          <form onSubmit={handleOnSubmit}
            className='flex-col justify-items-center space-y-2'>

            <Input label="Your Username" type="username" placeholder="Username" icon={FaUser} id="username" onChange={handleOnChange} />

            <Input label="Your Password" type="password" placeholder="********" icon={FaKey} id="password" onChange={handleOnChange} />

            <Button type="submit" text={loading ? "Loading...." : "Sign In"} style='gradient' className='w-71 text-xl pb-2 mt-4' disabled={loading}>
            </Button>
          </form>
          <div className='ml-22 md:ml-52 lg:ml-2 mt-4'>
            Don't Have An Account ?
            <Link to="/sign-up" className='ml-2 text-blue-600 link-hover text-md font-semibold' >Sign Up</Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default SignIn