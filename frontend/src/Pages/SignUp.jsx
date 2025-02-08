import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaKey, FaUser } from "react-icons/fa"
import { AiFillMail } from 'react-icons/ai'
import Container from '../Components/Container/Container'
import { Button, Input, Logo } from '../Components/CompsIndex'



const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }
  console.log(formData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("")

    if (
      !formData.username ||
      !formData.email ||
      !formData.password) {
      return setErrorMsg('All Fields Are Required!')
    }


    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch('/api/v1/user/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json();



      if (!res.ok) {
        setLoading(false)
        if (res.status === 409) {
          return setErrorMsg("User with this email or username already exists!");
        }
        return setErrorMsg(data.message || "SignUp Failed!")
      }

      navigate('/sign-in')
      alert("SignUp Successfully")
      console.log(data)
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
      console.log(`SignUp Err: ${error.message}`)
    } finally {
      setLoading(false)
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

      <div className='lg:ml-70 flex flex-col lg:flex-row  '>
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

            <Input label="Your E-Mail" type="email" placeholder="abcd@gmail.com" icon={AiFillMail} id="email" onChange={handleOnChange} />

            <Input label="Your Password" type="password" placeholder="Password" icon={FaKey} id="password" onChange={handleOnChange} />

            <Button type="submit" text={loading ? "Loading...." : "Sign Up"} style='gradient' className='w-71 text-xl pb-2 mt-4' disabled={loading}>
            </Button>
          </form>
          <div className=' ml-22 md:ml-52 lg:ml-2 mt-4'>
            Already a User ?
            <Link to="/sign-in" className='ml-2 text-blue-600 link-hover text-md font-semibold' >Sign In</Link>
          </div>
        </div>
      </div>

    </Container>
  )
}

export default SignUp