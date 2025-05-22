import React, { useEffect, useState } from 'react'
import { API } from '../../../API/API.js'
import { useSelector } from 'react-redux'
import { FaArrowUp, FaComment } from 'react-icons/fa'
import { HiDocumentText } from 'react-icons/hi'
import { Button, Loader, PageTitle } from '../../../Components/CompsIndex.js'
import { Link } from 'react-router-dom'

const Dash = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser)

  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [lastWeekPosts, setLastWeekPosts] = useState(0)
  const [lastWeekComments, setLastWeekComments] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoading(true)
        const { data } = await API.get(`/user/posts?userId=${currentUser._id}&setLimit=${5}`)
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
        const { data } = await API.get(`comment/comments?userId=${currentUser._id}&setLimit=${5}`)
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

    getPosts()
    getComments()
  }, [])

  return (
    <>
      <PageTitle title="Dashboard" />
      {
        loading
          ? <Loader />
          : <div className='md:mx-auto mt-6 md:mt-10 lg:mt-0'>
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
            <div className='mt-4 flex flex-wrap gap-4 justify-center'>
              <div className='p-4 flex flex-col gap-2 w-md md:w-auto rounded-md shadow-xs shadow-base-content'>
                <div className='flex justify-between text-center'>
                  <h1 className='p-2 text-center font-bold text-lg'>Recent Posts</h1>
                  <Link to="/dashboard?tab=my-posts">
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
                                <span className='link-hover'>{post.postTitle}</span>
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
              <div className='p-4 flex flex-col gap-2 w-md md:w-auto rounded-md shadow-xs shadow-base-content'>
                <div className='flex justify-between text-center'>
                  <h1 className='p-2 text-center font-bold text-lg'>Recent Comments</h1>
                  <Link to="/dashboard?tab=comments">
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

export default Dash