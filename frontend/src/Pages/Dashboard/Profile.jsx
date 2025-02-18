import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Input, Button } from '../../Components/CompsIndex.js'
import { FaKey, FaUser } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
import { API } from '../../API/API.js'
import { data } from 'react-router-dom'

const Profile = () => {
  const currentUser = useSelector(state => state?.user?.currentUser?.data?.user)
  const dispatch = useDispatch()

  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarFileUrl, setAvatarFileUrl] = useState(null)
  const avatarFilePickerRef = useRef()

  //file selection handler
  const handleUpdateAvatar = (e) => {
    const file = e.target.files[0]
    if (file) {
      setAvatarFile(file)
      setAvatarFileUrl(URL.createObjectURL(file))
    }

  }

  console.log(avatarFile, avatarFileUrl)
  //upload when avatar select 
  useEffect(() => {
    if (avatarFile) {
      uploadNewAvatar()
    }
  }, [avatarFile])

  //uploading avatar to backend
  // Uploading the avatar to backend
  const uploadNewAvatar = async () => {
    if (!avatarFile) {
      return console.log("Avatar file is missing");
    }

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await API.post("/user/update_avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
      if (res.data && res.data.avatar) {
        setAvatarFileUrl(res.data.avatar); // Update with the new avatar URL
      }
    } catch (error) {
      console.error("Avatar update failed:", error.message);
    }
  };


  return (
    <div className="hero bg-base-100">
      <div className="hero-content flex flex-col min-h-screen">
        <h1 className='font-semibold text-3xl'>Profile</h1>
        <form >
          <input
            type="file"
            name='avatar'
            className="hidden file-input file-input-secondary"
            onChange={handleUpdateAvatar}
            ref={avatarFilePickerRef}
          />
          <div
            className='h-32 w-32 cursor-pointer shadow-2xl overflow-hidden rounded-full mx-auto'
            onClick={() => avatarFilePickerRef.current.click()}
          >
            <img
              src={avatarFileUrl || currentUser.avatar}
              alt="avatar"
              className='rounded-full w-full h-full border-6 border-slate-400'
            />
          </div>
          <div className='mt-8 space-y-2'>
            <Input
              icon={FaUser}
              type="username"
              placeholder={currentUser.username}
              id="username"
            />

            <Input
              icon={AiFillMail}
              type="email"
              placeholder={currentUser.email}
              id="email"
            />

            <Input
              icon={FaKey}
              type="password"
              placeholder="password"
              id="password"
            />

            <Button
              type="submit"
              text="Update"
              style='gradient'
              className='w-70 text-xl pb-2 mt-4' />

          </div>
        </form>
        <div className='text-red-400 space-x-24 mt-4'>
          <span className='cursor-pointer hover:text-red-600'>Delete Account</span>
          <span className='cursor-pointer hover:text-red-600'>Sign Out</span>
        </div>
      </div>
    </div>
  )
}

export default Profile