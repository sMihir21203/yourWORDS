import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API.js'
import { FaArrowUp, FaComment } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { Button } from '../../../Components/CompsIndex.js'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const tab = searchParams.get('tab')
  const userId = tab?.includes('/') ? tab.split('/')[1] : null
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [comments, setComments] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [lastWeekPosts, setLastWeekPosts] = useState(0)
  const [lastWeekComments, setLastWeekComments] = useState(0)


  useEffect(() => {

    const getUserInfo = async () => {
      try {
        const { data } = await API.get(`/user/${userId}`)
        if (data) {
          const userInfo = data.data
          setUserInfo(userInfo)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to get author info")
      }
    }

    const getPosts = async () => {
      try {
        const { data } = await API.get(`/user/posts?userId=${userId}&setLimit=${5}`)
        if (data) {
          const postData = data.data?.userPosts
          const totalPosts = data.data?.totalPosts
          const lastWeekPosts = data.data?.lastWeekPosts

          setPosts(postData)
          setTotalPosts(totalPosts)
          setLastWeekPosts(lastWeekPosts)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to get Posts!")
      }
    }
    const getComments = async () => {
      try {
        const { data } = await API.get(`/comment/comments?userId=${userId}&setLimit=${5}`)
        if (data) {
          const commentsData = data.data?.comments
          const totalComments = data.data?.totalComments
          const lastWeekComments = data.data?.lastWeekComments

          setComments(commentsData)
          setTotalComments(totalComments)
          setLastWeekComments(lastWeekComments)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to get Comments")
      }
    }

    getUserInfo()
    getPosts()
    getComments()
  }, [])

  return (
    <div className='md:mx-auto space-y-4'>
      <div className='text-center font-semibold text-4xl mb-12'>Profile</div>
      {/* userinfo */}
      <div className='flex flex-row items-center justify-center gap-2'>
        <div className='text-3xl font-bold'>
          @{userInfo.username}
        </div>
        <div>
          <img
            src={userInfo.avatar}
            alt="user"
            className='w-15 h-15 rounded-full object-cover shadow-md shadow-base-content' />
        </div>
      </div>
      {/* above Data */}
      <div className='flex flex-wrap gap-4 justify-center'>

        {/* Posts */}
        <div className='w-sm flex flex-col p-4 shadow-xs shadow-base-content rounded-sm'>
          <div className='flex justify-between'>
            <div>
              <h3>Total Posts</h3>
              <p className='text-4xl font-semibold -mt-2 mb-4'>{totalPosts}</p>
            </div>
            <HiDocumentText className='shadow-xs shadow-base-content p-2 rounded-full' size={76} />
          </div>
          <div className='font-semibold flex gap-2'>
            <span className='flex items-center text-success font-bold'>
              <FaArrowUp size={13} />
              {lastWeekPosts}
            </span>
            <div>lastWeek</div>
          </div>
        </div>

        {/* Comments */}
        <div className='w-sm flex flex-col p-4 shadow-xs shadow-base-content rounded-sm'>
          <div className='flex justify-between'>
            <div className=''>
              <h3>Total Comments</h3>
              <p className='text-4xl font-semibold -mt-2 mb-4'>{totalComments}</p>
            </div>
            <span className=' flex items-center justify-center rounded-full shadow-xs shadow-base-content p-2 h-20 w-20'>
              <FaComment size={50} />
            </span>
          </div>
          <div className='font-semibold flex gap-2'>
            <span className='flex items-center text-success font-bold'>
              <FaArrowUp size={13} />
              {lastWeekComments}
            </span>
            <div>lastWeek</div>
          </div>
        </div>
      </div>

      {/* tables */}
      <div className='flex flex-wrap gap-4 justify-center'>
        <div className='p-4 flex flex-col gap-2 w-md md:w-auto rounded-md shadow-xs shadow-base-content'>
          <div className='flex justify-between text-center'>
            <h1 className='p-2 text-center font-bold text-lg'>Recent Posts</h1>
            <Link to={`?tab=posts/${userInfo._id}`}>
              <Button
                text="See all"
                className='w-fit px-4'
              />
            </Link>
          </div>
          <div className='overflow-x-auto overflow-y-auto border-none shadow-sm shadow-base-content rounded-sm'>
            <table className='table text-nowrap'>
              <thead className=' bg-base-200 text-lg text-base-content'>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody className='font-semibold'>
                {
                  posts &&
                  posts.map(post => (
                    <tr key={post._id} className=''>
                      <td>
                        <img
                          src={post.postImg}
                          alt={post.postTitle}
                          className='rounded-md h-10 w-15' />
                      </td>
                      <td>
                        {post.postTitle}
                      </td>
                      <td>
                        {post.postCategory}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className='p-4 flex flex-col gap-2 w-md md:w-auto rounded-md shadow-xs shadow-base-content'>
          <div className='flex justify-between text-center'>
            <h1 className='p-2 text-center font-bold text-lg'>Recent Comments</h1>
            <Link to={`?tab=comments/${userInfo._id}`}>
              <Button
                text="See all"
                className='w-fit px-4'
              />
            </Link>
          </div>
          <div className='overflow-x-auto overflow-y-auto border-none shadow-sm shadow-base-content rounded-sm'>
            <table className='table text-nowrap'>
              <thead className=' bg-base-200 text-lg text-base-content'>
                <tr>
                  <th>Comment</th>
                  <th>Likes</th>
                </tr>
              </thead>
              <tbody className='font-semibold'>
                {
                  comments &&
                  comments.map(comment => (
                    <tr key={comment._id} className=''>
                      <td>
                        {comment.comment}
                      </td>
                      <td>
                        {comment.totalLikes}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile