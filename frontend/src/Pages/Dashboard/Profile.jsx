import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateStart, updateSuccess, updateFailure } from "../../Store/User/userSlice.js"
import { Input, Button, ChangePassword } from '../../Components/CompsIndex.js'
import { FaUser } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
import { API } from '../../API/API.js'

const Profile = () => {
  const currentUser = useSelector(state => state?.user?.currentUser?.data?.user)
  const dispatch = useDispatch()

  const { loading, error: errorMsg } = useSelector((state) => state.user)

  useEffect(() => {
    if (errorMsg) dispatch(updateFailure(null))
  }, [])

  // Avatar update data
  const [avatarFileUrl, setAvatarFileUrl] = useState(currentUser?.avatar)
  const avatarFilePickerRef = useRef()

  // avatar update handler
  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0]
    if (!file) {
      return console.log(dispatch(updateFailure("image is missing")))
    }

    setAvatarFileUrl(URL.createObjectURL(file)) //preview avatar

    const formData = new FormData()
    formData.append("avatar", file)

    try {
      dispatch(updateStart())

      const res = await API.post("user/update_avatar", formData)

      const updatedData = res?.data?.data

      dispatch(updateSuccess(updatedData))
    } catch (error) {
      dispatch(error.response?.data?.message || "Something went wrong while updating avatar! please try again!")
    }
  }


  // Update username and email data
  const [updateFormData, setUpdateFormData] = useState({
    username: '',
    email: ''
  })

  const handleOnChange = (e) => {
    setUpdateFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value.trim()
    }))
  }

  const handleUpdateOnSubmit = async (e) => {
    e.preventDefault()

    try {
      dispatch(updateStart())

      const res = await API.post('user/update_details', updateFormData)

      const updatedData = res?.data?.data

      // console.log(updatedData)
      dispatch(updateSuccess(updatedData))
    } catch (error) {
      dispatch(updateFailure(error.response?.data?.message || "Something went wrong while updating username or email please try again!"))
    }
  }

  const [showChangePass, setShowChangePass] = useState(false)

  return (
    <div className="hero min-h-screen flex flex-col justify-center items-center bg-base-200">
      
      <div className="hero-content text-center flex flex-col items-center">
      {
        errorMsg && (
          <div
            role="alert"
            className="alert alert-error alert-soft flex justify-center text-center"
          >
            {`👀 ${errorMsg}`}
          </div>
        )
      }
        <h1 className='font-semibold text-3xl mb-6'>Profile</h1>

        <form onSubmit={handleUpdateOnSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="file"
            name='avatar'
            className="hidden file-input file-input-secondary"
            onChange={handleUpdateAvatar}
            ref={avatarFilePickerRef}
          />

          {/* Avatar Section */}
          <div className="group">
            <div
              className="h-32 w-32 cursor-pointer shadow-2xl overflow-hidden rounded-full border border-gray-300 relative flex items-center justify-center"
              onClick={() => avatarFilePickerRef.current.click()}
            >
              <img
                src={avatarFileUrl || currentUser.avatar}
                alt="avatar"
                className="rounded-full w-full h-full"
              />
              {/* Hover Text */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click Here to Update Avatar!
              </div>
            </div>
          </div>

          {/* Input Fields */}
          <div className='space-y-4 w-full flex flex-col items-center'>
            <Input
              icon={FaUser}
              type="username"
              placeholder={currentUser.username}
              id="username"
              onChange={handleOnChange}
              className="w-80"
            />

            <Input
              icon={AiFillMail}
              type="email"
              placeholder={currentUser.email}
              id="email"
              onChange={handleOnChange}
              className="w-80"
            />

            <Button
              type="submit"
              text="Update Details"
              style='gradient'
              className='w-70 text-xl pb-2 mt-4'
            />
          </div>
        </form>

        {/* Change Password & Delete Account */}
        <div className="mt-6 flex flex-col items-center space-y-2">
          <div
            className="cursor-pointer hover:text-blue-700 hover:font-bold"
            onClick={() => setShowChangePass(true)}
          >
            Change Password
          </div>
          {showChangePass && <ChangePassword onClose={() => setShowChangePass(false)} />}

          <div className="cursor-pointer hover:text-red-600 hover:font-bold">
            Delete Account
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
