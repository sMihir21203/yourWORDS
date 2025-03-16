import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaUser } from "react-icons/fa"
import { AiFillMail } from 'react-icons/ai'
import { Button, Input, GoogleAuth, Container, Loader } from '../Components/CompsIndex.js'
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure, clearAllMessages } from "../Store/User/userSlice.js"
import { API } from "../API/API.js"


const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const { loading, error: errorMsg, success: successMsg } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg || successMsg) {
      setTimeout(() => {
        dispatch(clearAllMessages())
      }, 3000);
    }
  }, [errorMsg, successMsg])

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }
  // console.log(formData);

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
      const res = await API.post("/user/sign-up", formData)

      const data = res.data;

      dispatch(signInSuccess(data))
      navigate('/sign_in')
      alert("SignUp Successfully")
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "oops something went wrong while signUp please try again!"))
    }
  }

  return (
    <Container>
      <div className="flex flex-col">
        {errorMsg && (
          <div role="alert" className="alert alert-error alert-soft flex justify-center text-center">
            {`👀 ${errorMsg}`}
          </div>
        )}
        {successMsg && (
          <div role="alert" className="alert alert-success alert-soft flex justify-center text-center">
            {`✅ ${successMsg}`}
          </div>
        )}


        <div className='hero-content flex-col lg:flex-row'>
          <div className='text-center lg:text-left lg:mr-2 lg:-mt-16 -mt-4'>
            <h1 className="text-5xl font-bold text-nowrap"><span className='bg-gradient-to-r hover:bg-gradient-to-l  from-[#ff007f] via-sky-400 to-[#003cff] text-transparent bg-clip-text'>signUp </span>Now!</h1>
            <p className='py-6'>
              to Share <span className='font-extrabold'>YourWords...</span>
            </p>
          </div>

          <div className='card bg-base-100 w-sm  shrink-0 shadow-2xl'>
            <div className='card-body flex items-center justify-center'>
              <fieldset className='fieldset w-full'>
                <form
                  onSubmit={handleOnSubmit}
                  className='w-full flex flex-col items-center space-y-4'>

                  <Input
                    label="Your Username"
                    type="text"
                    placeholder="Username"
                    icon={FaUser}
                    id="username"
                    onChange={handleOnChange}
                  />

                  <Input
                    label="Your E-Mail"
                    type="email"
                    placeholder="abcd@gmail.com"
                    icon={AiFillMail}
                    id="email"
                    onChange={handleOnChange}
                  />

                  <Input
                    label="Your Password"
                    type="password"
                    placeholder="********"
                    icon={FaKey}
                    id="password"
                    onChange={handleOnChange}
                  />

                  <Button
                    type="submit"
                    style="imp"
                    text={loading ? <Loader /> : "Sign Up"}
                    className='mt-3'
                  />
                </form>

                {/* Google Sign-Up Button*/}
                <div className='tooltip tooltip-info tooltip-top' data-tip="Sign Up With Google!">
                  <GoogleAuth />
                </div>

                {/* Sign-In Link */}
                <p className='pl-1 mt-2'>
                  Already a User?
                  <Link
                    to="/sign_in"
                    className='ml-1 text-blue-600 link-hover font-semibold'
                  >Sign In
                  </Link>
                </p>
              </fieldset>
            </div>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default SignUp