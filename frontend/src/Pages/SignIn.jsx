import React, { useState, useEffect } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'
import { Button, Input, GoogleAuth, Container, Loader, PageTitle } from '../Components/CompsIndex.js'
import { FaUser, FaKey } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { signInStart, signInSuccess, signInFailure, clearAllMessages } from "../Store/User/userSlice.js"
import { API } from "../API/API.js"



const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const { loading, error: errorMsg, successMsg } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMsg || successMsg) {
      setTimeout(() => {
        dispatch(clearAllMessages())
      }, 5000);
    }
  }, [errorMsg, successMsg])

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
      const res = await API.post("/user/sign-in", formData)

      const data = res.data
      const successMessage = data.message
      // console.log(data)
      dispatch(signInSuccess({ ...data, message: successMessage }))

      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || "oops something went wrong while signIn please try again!"))
    }
  }
  return (
    <Container>
      <PageTitle title="SignIn"/>
      <div className="flex flex-col items-center">
        {
          errorMsg && (
            <div
              role="alert"
              className="alert alert-error alert-soft flex justify-center text-center mb-4"
            >
              {`👀 ${errorMsg}`}
            </div>
          )
        }
        {successMsg && (
          <div role="alert" className="alert alert-success alert-soft flex justify-center text-center">
            {`✅ ${successMsg}`}
          </div>
        )}
        <div className='flex flex-col lg:flex-row lg:mb-8'>
          <div className='lg:my-auto font-semibold text-center lg:text-left lg:mr-6'>
            <h1 className="text-5xl text-nowrap">
              <span className='font-bold'>
                signIn
              </span> Now!
            </h1>
            <p className='py-6'>
              to Share <span className='font-extrabold'>YourWords...</span>
            </p>
          </div>

          <div className='card  w-sm  shrink-0 shadow-2xl'>
            <div className='card-body flex items-center justify-center'>
              <fieldset className='fieldset w-full'>
                <form
                  onSubmit={handleOnSubmit}
                  className='w-full flex flex-col items-center space-y-4'
                >

                  <Input
                    label="Your Username"
                    type="text"
                    placeholder="Username"
                    icon={FaUser}
                    id="username"
                    onChange={handleOnChange}
                    className="w-full"
                  />


                  <Input
                    label="Your Password"
                    type="password"
                    placeholder="********"
                    icon={FaKey}
                    id="password"
                    onChange={handleOnChange}
                    className="w-full"
                  />


                  <div className="w-full flex justify-start">
                    <Link
                      to='/forgot-password'
                      className="link-hover hover:text-blue-600 hover:font-bold">
                      Forgot password?
                    </Link>
                  </div>


                  <Button
                    type="submit"
                    style='imp'
                    text={loading ? <Loader /> : "Sign In"}
                    className='mt-3'
                  />
                </form>

                {/* Google Sign-In Button */}
                <div className='tooltip tooltip-info tooltip-top' data-tip="Sign In With Google!">
                  <GoogleAuth />
                </div>

                {/* Sign-Up Link */}
                <p className='pl-1 mt-2'>
                  Don't Have An Account?
                  <Link
                    to="/sign-up"
                    className='ml-1 text-blue-600 link-hover font-semibold'
                  >
                    Sign Up
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

export default SignIn