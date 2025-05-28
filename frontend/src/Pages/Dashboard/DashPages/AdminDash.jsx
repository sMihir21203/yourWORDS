import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API.js'
import { useSelector } from 'react-redux'
import { FaArrowUp, FaComment, FaUsers } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { Button, Loader, PageTitle } from '../../../Components/CompsIndex.js'
import { Link } from 'react-router-dom'

const AdminDash = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser)
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [lastWeekUsers, setLastWeekUsers] = useState(0)
  const [lastWeekPosts, setLastWeekPosts] = useState(0)
  const [lastWeekComments, setLastWeekComments] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    const getUsers = async () => {
      try {
        setLoading(true)
        const { data } = await API.get(`/user/get-users?setLimit=${5}`)
        if (data) {
          const usersData = data.data?.users || []
          const totalUsers = data.data?.totalUsers || 0
          const lastWeekUsers = data.data?.lastWeekUsers || 0

          setUsers(usersData)
          setTotalUsers(totalUsers)
          setLastWeekUsers(lastWeekUsers)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to get Users!")
      } finally {
        setLoading(false)
      }
    }

    const getPosts = async () => {
      try {
        setLoading(true)
        const { data } = await API.get(`/user/posts?setLimit=${5}`)
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
      } finally {
        setLoading(false)
      }
    }

    const getComments = async () => {
      try {
        setLoading(true)
        const { data } = await API.get(`comment/comments?setLimit=${5}`)
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
      } finally {
        setLoading(false)
      }
    }

    getUsers()
    getPosts()
    getComments()
  }, [])

  return (
    <>
      <PageTitle title="Admin Dashboard" />
      {
        loading
          ? <Loader />
          : <div className='md:mx-auto mt-6 md:mt-10 lg:mt-0 w-sm md:w-lg lg:w-7xl'>
            {/* above Data */}
            <div className='flex flex-wrap gap-4 justify-center'>
              {/* Users */}
              {
                currentUser.isAdmin && (
                  <div className='w-xs md:w-sm flex flex-col p-4 shadow-xs shadow-base-content rounded-sm'>
                    <div className='flex justify-between'>
                      <div>
                        <h3>Total Users</h3>
                        <p className='text-4xl font-semibold -mt-2 mb-4'>{totalUsers}</p>
                      </div>
                      <FaUsers className='shadow-xs shadow-base-content p-2 rounded-full' size={76} />
                    </div>
                    <div className='font-semibold flex gap-2'>
                      <span className='flex items-center text-success font-bold'>
                        <FaArrowUp size={13} />
                        {lastWeekUsers}
                      </span>
                      <div>lastWeek</div>
                    </div>
                  </div>
                )
              }

              {/* Posts */}
              <div className='w-xs md:w-sm flex flex-col p-4 shadow-xs shadow-base-content rounded-sm'>
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
              <div className='w-xs md:w-sm flex flex-col p-4 shadow-xs shadow-base-content rounded-sm'>
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
            <div className='mt-4 flex flex-wrap gap-4 justify-center'>
              <div className='p-4 flex flex-col gap-2 w-sm md:w-md rounded-md shadow-xs shadow-base-content'>
                <div className='flex justify-between text-center'>
                  <h1 className='p-2 text-center font-bold text-lg'>Recent Users</h1>
                  <Link to="?tab=all-users">
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
                        <th>Avatar</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody className='font-semibold'>
                      {
                        users &&
                        users.map(user => (
                          <tr key={user._id} className=''>
                            <td>
                              <img
                                src={user.avatar}
                                alt={user.username}
                                className='rounded-full w-10 h-10' />
                            </td>
                            <td>
                              <Link to={`?tab=profile/${user._id}`}>
                                <span className='link-hover'>{user.username}</span>
                              </Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='p-4 flex flex-col gap-2 w-sm md:w-auto rounded-md shadow-xs shadow-base-content'>
                <div className='flex justify-between text-center'>
                  <h1 className='p-2 text-center font-bold text-lg'>Recent Posts</h1>
                  <Link to="?tab=all-posts">
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
                              <Link to={`/post/${post.slug}`}>
                                <span className='link-hover'>
                                  {post.postTitle}</span>
                              </Link>
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
              <div className='p-4 flex flex-col gap-2 w-sm md:w-auto rounded-md shadow-xs shadow-base-content'>
                <div className='flex justify-between text-center'>
                  <h1 className='p-2 text-center font-bold text-lg'>Recent Comments</h1>
                  <Link to="/dashboard?tab=all-comments">
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
      }
    </>
  )
}

export default AdminDash