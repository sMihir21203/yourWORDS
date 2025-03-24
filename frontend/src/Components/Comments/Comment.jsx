import React, { useEffect, useState } from 'react'
import { API } from '../../API/API'
import moment from "moment"

const Comment = ({ comment }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!comment) return
    const getUser = async () => {
      try {
        const { data } = await API.get(`/user/${comment.userId}`)
        if (data) {
          setUser(data.data)
        }
      } catch (error) {
        console.log(error?.response?.data?.message || "Failed to fetch getUser")
      }
    }
    getUser();
  }, [comment])

  return (
    <div className='flex p-4 border-b-3 border-base-300'>
      <div className='flex shrink-0 mr-2'>
        <img
          src={user.avatar}
          alt={user.username}
          className='w-10 h-10 rounded-full shadow-xs shadow-base-content'
        />
      </div>
      <div className='flex-1 text-start'>
        <div className='flex items-center mb-1  text-xs'>
          <span className='font-bold truncate mr-2'>@{user.username} </span>
          <span >{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className='pb-2'>
          {comment.comment}</p>
      </div>
    </div>
  )
}

export default Comment