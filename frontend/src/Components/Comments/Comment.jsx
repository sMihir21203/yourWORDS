import React, { useEffect, useState } from 'react'
import { API } from '../../API/API'
import moment from "moment"
import { FaThumbsUp } from "react-icons/fa"

const Comment = ({ currentUser, comment, like }) => {
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
    <li className='list-row items-center'>
      <div className='flex flex-col items-start'>
        <div className='flex items-center'>
          <img
            src={user.avatar}
            alt={user.username}
            className='w-10 h-10 rounded-full shadow-xs shadow-base-content mr-2'
          />
          <div className='text-start'>
            <div className='flex items-center my-1  text-xs'>
              <span className='font-bold truncate mr-2'>@{user.username} </span>
              <span >{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='pb-2'>
              {comment.comment}
            </p>
          </div>
        </div>
        <div className='ml-12 mt-2 flex items-center'>
          <div className='flex items-center'>
            <FaThumbsUp
              onClick={() => like(comment._id)}
              size={18}
              className={`cursor-pointer text-slate-400 hover:text-[#003cff] hover:scale-105 mr-2 ${currentUser && comment.likes.includes(currentUser._id) && "!text-[#003cff]"}`}
            />
            <p>
              {
                comment.totalLikes > 0 &&
                comment.totalLikes + " " + (
                  comment.totalLikes === 1
                    ? "like"
                    : "likes"
                )
              }
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Comment