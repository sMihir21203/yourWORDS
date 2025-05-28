import React, { useRef } from 'react'
import { Button } from '../CompsIndex.js'
import { API } from '../../API/API.js'

const DeletePost = ({ userId, postId }) => {
  const modalRef = useRef(null)

  const handleDeletePost = async () => {
    try {
      const deletePost = await API.get(`/post/${userId}/${postId}/delete-post`)
      if (!deletePost.status === 200) {
        console.log(deletePost.data?.message || "Delete Post Issue")
      } else {
        const searchParams = new URLSearchParams(window.location.search)
        const currentPage = searchParams.get("tab")
        window.location.href = `dashboard?tab=${currentPage}`
      }
    } catch (error) {
      console.log(error.response?.data?.message || "DeletePost Issue")
    }
  }

  return (
    <div>
      <p
        onClick={() => modalRef.current.showModal()}
        className='link-hover cursor-pointer text-error'
      >
        Delete
      </p>
      <dialog ref={modalRef}
        className='modal text-center'>
        <div className='modal-box rounded-xl h-46 py-8'>
          <p className="pb-4 font-bold text-xl">
            Are You Sure!<br />You Want to Delete This Post?
          </p>
          <div className='space-x-2 flex justify-center'>
            <Button
              text="I'm Sure"
              type="submit"
              onClick={handleDeletePost}
              className="w-28 text-error shadow-error"
            />
            <Button
              text="Cancel"
              onClick={() => modalRef.current.close()}
              className='w-20 text-success shadow-success'
            />
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default DeletePost