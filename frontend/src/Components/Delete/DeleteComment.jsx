import React, { useEffect, useRef } from 'react'
import { API } from '../../API/API.js'
import { Button } from '../CompsIndex.js'

const DeleteComment = ({
  comment,
  setComments,
  refresh,
  setShowMore,
  setFetchCount,
  setTotalComs,
  totalComs,
  className = ""
}) => {
  const modalRef = useRef()

  const handleDeleteComment = async () => {
    try {
      const { data } = await API.get(`/comment/${comment._id}/${comment.userId}/${comment.postId}/delete`)
      if (data) {
        // const message = data.message
        setComments(prevCom => {
          const updatedComs = prevCom.filter(com => com._id !== comment._id)
          const updatedFetchCount = updatedComs.length
          const updatedTotalComs = totalComs - 1

          setFetchCount(updatedFetchCount)
          setTotalComs(updatedTotalComs)

          if (updatedFetchCount < 9) {
            refresh(prev => !prev)
          }

          setShowMore(updatedFetchCount < updatedTotalComs)
          return updatedComs
        })
        modalRef.current.close()
      }
    } catch (error) {
      console.error(error)
      console.error(error?.response?.data?.message || "failed to delete comment")
    }
  }

  return (
    <div>
      <p
        onClick={() => modalRef.current.showModal()}
        className={`link-hover cursor-pointer ${className}`}
      >
        Delete
      </p>
      <dialog
        ref={modalRef}
        className="modal text-center">
        <div className='modal-box rounded-xl h-46 py-8'>
          <p className="pb-4 font-bold text-xl">
            Are You Sure!<br />You Want to Delete This Comment?
          </p>
          <div className='space-x-2 flex justify-center'>
            <Button
              text="I'm Sure"
              type="submit"
              onClick={handleDeleteComment}
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

export default DeleteComment