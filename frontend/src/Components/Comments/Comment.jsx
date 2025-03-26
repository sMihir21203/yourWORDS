import React, { useEffect, useState } from 'react'
import { API } from '../../API/API'
import { Button, DeleteComment, Loader } from "../CompsIndex.js"
import moment from "moment"
import { FaThumbsUp } from "react-icons/fa"

const Comment = ({ currentUser, comment, postId, like, edit, setComments }) => {
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [editedComment, setEditedComment] = useState(comment.comment)
  const [loading, setLoading] = useState(false)
  const maxChar = 200

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


  const handleEditing = () => {
    setEditing(true);
    setEditedComment(comment.comment)
  }

  const handleOnSubmitSave = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await API.post(`/comment/${comment._id}/${comment.userId}/edit`, { editedComment })
      if (data) {
        const updatedComment = data.data?.comment
        edit(comment, updatedComment)
        setEditing(false)
      }
    } catch (err) {
      console.error(err?.response?.data?.message || "failed to edit comment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <li className='list-row'>
      <div className='flex flex-col'>
        <div className='flex items-center'>
          <img
            src={user.avatar}
            alt={user.username}
            className={`w-10 h-10 mr-2 rounded-full shadow-xs shadow-base-content ${editing && "mb-[5.1rem]"}`}
          />
          <div className='text-start'>
            <div className='flex items-center my-1  text-xs'>
              <span className='font-bold truncate mr-2 opacity-90'>@{user.username} </span>
              <span className='opacity-70'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            {
              editing
                ? <form onSubmit={handleOnSubmitSave}>
                  <textarea
                    required
                    maxLength={200}
                    placeholder='Add Comment...'
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className='w-[15rem] md:w-xl rounded-sm h-16 p-2 border-none outline-none shadow-xs shadow-base-content text-sm'
                  />
                  <div className="flex items-center justify-between mx-1 my-1">
                    <p className="text-xs opacity-70">{maxChar - editedComment.length} characters remaining</p>
                    <div className="space-x-2">
                      <Button
                        type="submit"
                        text={loading ? <Loader /> : "Save"}
                        className='w-fit px-2 rounded-sm bg-gradient-to-r from-[#ff007f] via-sky-300 to-[#003cff] text-transparent bg-clip-text shadow-sky-300'
                        disabled={!editedComment.trim()}
                      />
                      <Button
                        type="button"
                        onClick={() => setEditing(false)}
                        text="Cancle"
                        className='w-fit px-1.5 shadow-sky-300 rounded-sm'
                      />
                    </div>
                  </div>
                </form>
                : <p className='text-[13.5px] pb-2 opacity-80'>
                  {comment.comment}
                </p>
            }
          </div>
        </div>
        {
          !editing &&
          <div className='text-xs ml-12 mt-2 flex items-center gap-2'>
            <div className='flex items-center'>
              <FaThumbsUp
                onClick={() => like(comment._id)}
                className={`cursor-pointer opacity-70 hover:opacity-100 hover:text-[#003cff] hover:scale-105 mr-1 ${currentUser && comment.likes.includes(currentUser._id) && "!text-[#003cff] !opacity-100"}`}
              />
              <p className='opacity-70'>
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
            {currentUser && (
              <>
                {(comment.userId === currentUser._id || currentUser.isAdmin) && (
                  <p
                    onClick={handleEditing}
                    className="opacity-70 cursor-pointer hover:text-[#003cff] link-hover"
                  >
                    Edit
                  </p>
                )}

                {(comment.userId === currentUser._id || currentUser.isAdmin || comment.postId === postId) && (
                  <DeleteComment comment={comment} setComments={setComments} />
                )}
              </>
            )}
          </div>
        }
      </div >
    </li >
  )
}

export default Comment