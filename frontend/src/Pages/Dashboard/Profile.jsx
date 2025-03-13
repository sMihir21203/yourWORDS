import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { updateStart, updateSuccess, updateFailure, clearAllMessages } from "../../Store/User/userSlice.js"
import { Input, Button, Loader } from '../../Components/CompsIndex.js'
import { ChangePassword, DashContainer, DeleteUser } from './DashIndex.js'
import { FaUser } from 'react-icons/fa'
import { AiFillMail } from 'react-icons/ai'
import { API } from '../../API/API.js'

const Profile = () => {
  const currentUser = useSelector(state => state?.user?.currentUser?.data?.loggedInUser)
  const dispatch = useDispatch()
  const { loading, error: errorMsg, success: successMsg } = useSelector((state) => state.user)

  const [showChangePass, setShowChangePass] = useState(false) // Track password change visibility

  useEffect(() => {
    if (errorMsg || successMsg) {
      setTimeout(() => {
        dispatch(clearAllMessages())
      }, 3000);
    }
  }, [errorMsg, successMsg]);

  // Avatar update data
  const [avatarLoader, setAvatarLoader] = useState(false)
  const [updateAvatarProgress, setUpdateAvatarProgress] = useState(0)
  const [avatarFileUrl, setAvatarFileUrl] = useState(currentUser?.avatar)
  const avatarFilePickerRef = useRef()

  const handleUpdateAvatar = async (e) => {
    e.preventDefault()

    const file = e.target.files[0]
    if (!file) {
      return alert("No file selected!")
    }

    const validImgTypes = ["image/jpeg", "image/png", "image/jpg"]

    if (!validImgTypes.includes(file.type)) {
      return alert("Invalid file type! Please upload JPEG,JPG, PNG!");
    }

    const maxSize = 1 * 1024 * 1024 //1mb

    if (file.size > maxSize) {
      return alert("Avatar Image size Must be less than 1mb")
    }

    setAvatarFileUrl(URL.createObjectURL(file)) //preview avatar
    setAvatarLoader(true)

    const formData = new FormData()
    formData.append("avatar", file)

    let interval;
    try {
      interval = setInterval(() => {
        setUpdateAvatarProgress((prev) => (prev < 100 ? prev + 10 : prev))
      }, 200);
      console.log(interval)

      const res = await API.post('user/update_avatar', formData)
      if (!res.ok) {
        clearInterval(interval)
        setUpdateAvatarProgress(0)
      }

      setTimeout(() => {
        clearInterval(interval)
        setAvatarLoader(false)
        setUpdateAvatarProgress(0)
      }, 1000);

      const updatedData = res?.data?.data
      const successMessage = res?.data?.message || "Avatar updated"

      dispatch(updateSuccess({ ...updatedData, message: successMessage }))

    } catch (error) {
      setAvatarLoader(false)
      dispatch(updateFailure(error.response?.data?.message || "Something went wrong while updating avatar! please try again!"))
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
    e.preventDefault();

    try {
      dispatch(updateStart());

      const res = await API.post('user/update_details', updateFormData);

      const updatedUserData = res?.data?.data; // Updated user details
      const successMessage = res?.data?.message || "Details updated"

      // console.log(`${updatedUserData}:- ${successMessage}:-`)

      dispatch(updateSuccess({ ...updatedUserData, message: successMessage }));
      setUpdateFormData({ username: "", email: "" })
    } catch (error) {
      setUpdateFormData({ username: "", email: "" })
      dispatch(updateFailure(error.response?.data?.message || "Something went wrong while updating username or email, please try again!"));
    }
  };


  return (
    <DashContainer>

      <h1 className='font-semibold text-3xl mb-2'>Profile</h1>
      {/* Avatar Section */}
      <div
        className="relative tooltip tooltip-info tooltip-side h-32 w-32 cursor-pointer shadow-2xl rounded-full border-2 border-slate-300 mb-12"
        data-tip="Click Here To Update Avatar!"
        onClick={() => avatarFilePickerRef.current.click()}
      >
        <input
          type="file"
          accept='image/*'
          name='avatar'
          className="hidden file-input file-input-secondary"
          onChange={handleUpdateAvatar}
          ref={avatarFilePickerRef}
        />
        {updateAvatarProgress > 0 && (
          <div
            className="radial-progress font-extrabold text-xl"
            style={{
              "--value": updateAvatarProgress.toString(),
              "--size": "8rem",
              "--thickness": "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            } /*as React.CSSProperties*/}
            aria-valuenow={updateAvatarProgress}
            role="progressbar"
          >
            {updateAvatarProgress}%
          </div>
        )}


        <img
          src={avatarFileUrl || currentUser.avatar}
          alt="avatar"
          className={`rounded-full w-full h-full hover:opacity-50 ${updateAvatarProgress ? "opacity-50" : "opacity-100"}`}

        />

      </div>

      <form onSubmit={handleUpdateOnSubmit}>
        {/* Show error message if any */}
        {errorMsg && (
          <div role="alert" className="alert alert-error text-lg w-[24rem] md:w-[28rem] text-center mb-2">
            {`👀 ${errorMsg}`}
          </div>
        )}
        {successMsg && (
          <div role="alert" className="alert alert-success text-lg w-[24rem] md:w-[28rem] mb-2">
            {`✅ ${successMsg}`}
          </div>
        )}

        {/* Hide username & email fields when changePass is true*/}
        {!showChangePass && (
          <div className='space-y-2 w-sm md:w-md flex flex-col items-center'>
            <Input
              icon={FaUser}
              type="username"
              placeholder={currentUser.username}
              id="username"
              onChange={handleOnChange}
              value={updateFormData.username}
            />

            <Input
              icon={AiFillMail}
              type="email"
              placeholder={currentUser.email}
              id="email"
              onChange={handleOnChange}
              value={updateFormData.email}
            />

            <Button
              type="submit"
              style='imp'
              text={loading ? <Loader /> : "Update Details"}
              className='mt-4 hover:pb-1'
            />
          </div>
        )}
      </form>
      {/* Change Password & Delete Account */}
      <div className="flex flex-col items-center -mt-4">

        {showChangePass && <ChangePassword setShowChangePass={setShowChangePass} />}

        <div className="flex gap-x-32 md:gap-x-48  mt-4">
          <DeleteUser />
          <p className="cursor-pointer  font-bold hover:scale-110 hover:bg-gradient-to-b from-[#ff007f] via-sky-300 to-[#003cff] hover:text-transparent bg-clip-text" onClick={() => setShowChangePass(!showChangePass)}>
            {showChangePass ? "Update Details" : "Change Password"}
          </p>


        </div>
      </div>

    </DashContainer>
  )
}

export default Profile
