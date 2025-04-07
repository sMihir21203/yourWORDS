import React, { useState } from 'react'
import { Input, Button, Loader, Container } from '../CompsIndex.js'
import { AiFillMail } from 'react-icons/ai'
import { API } from '../../API/API.js'

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState({
    email: ""
  })
  const [resetMsg, setResetMsg] = useState(false)

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await API.post("/user/reset-link", email)
      if (data) {
        setResetMsg(true)
      }
    } catch (error) {
      console.error(error)
      console.error(error?.response?.data?.message || "failed to send reset password link!, please try again!")
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
              resetMsg
                ? <p className='text-lg font-semibold text-center text-info'>Password reset link successfully sent to your email address! <br />check your email address!</p>
                : <form
                  onSubmit={handleOnSubmit}
                  className='w-full flex flex-col items-center space-y-4'
                >
                  <p className='text-lg font-semibold'>Enter Your Registerd Email Address</p>
                  <Input
                    required
                    label="Your Email"
                    type="email"
                    placeholder="abcd@gmail.com"
                    icon={AiFillMail}
                    id="email"
                    onChange={(e) => setEmail({ email: e.target.value })}
                    className="w-full"
                  />
                  <Button
                    type="submit"
                    style='imp'
                    text={loading ? <Loader /> : "Get Link"}
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

export default ForgotPassword