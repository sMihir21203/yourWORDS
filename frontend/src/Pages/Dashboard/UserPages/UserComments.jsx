import React, { useState, useEffect } from 'react'
import { DeleteComment, Loader, Button, PageTitle } from '../../../Components/CompsIndex.js'
import { API } from "../../../API/API.js";
import { Link } from 'react-router-dom';

const AllComments = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const tab = searchParams.get('tab')
  const userId = tab?.includes('/') ? tab.split('/')[1] : null
  const [comments, setComments] = useState([])
  const [totalComs, setTotalComs] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [userInfo, setUserInfo] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [firstFetchDone, setFirstFetchDone] = useState(false)
  const [refresh, setRefresh] = useState(false)

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
    const getPostsComments = async () => {
      try {
        if (!firstFetchDone) setLoading(true)

        const { data } = await API.get(`/comment/comments?userId=${userId}`)
        if (data) {
          const commentsInfo = data?.data?.comments || []
          const totalComs = data?.data?.totalComments || 0

          setComments(commentsInfo)
          setFetchCount(commentsInfo.length)
          setTotalComs(totalComs)
          setShowMore(commentsInfo.length < totalComs)
        }
      } catch (error) {
        console.error(error)
        console.error(error?.response?.data?.message || "failed to fetch all posts comments")
      } finally {
        setLoading(false)
        setFirstFetchDone(true)
      }
    }
    getUserInfo()
    getPostsComments()
  }, [refresh])

  const handleShowMore = async () => {
    const setStartIndex = comments.length
    try {
      setLoadingMore(true)
      const { data } = await API.get(`/comment/comments?userId=${userId}&setStartIndex=${setStartIndex}`)
      if (data) {
        const moreCommentsInfo = data?.data?.comments || []
        setComments((prev) => [...prev, ...moreCommentsInfo])
        setFetchCount((prev) => prev + moreCommentsInfo.length)
        setShowMore(comments.length + moreCommentsInfo.length < totalComs)
      }
    } catch (error) {
      console.error(error)
      console.error(error?.response?.data?.message || "failed to fetch more posts comments")
    } finally {
      setLoadingMore(false)
    }
  }


  return (
    <>
      <PageTitle title={`Comments: @${userInfo.username}`} />
      {loading && <Loader />}
      {comments.length > 0 ? (

        <div className="w-sm md:w-lg lg:w-7xl">
          <div className='text-center font-semibold text-4xl'>Comments</div>
          {/* userinfo */}
          <div className='flex flex-row items-center gap-2 mb-4'>
            <div className='text-xl md:text-3xl font-bold'>
              @{userInfo.username}
            </div>
            <div>
              <img
                src={userInfo.avatar}
                alt="user"
                className='w-9 h-9 md:w-15 md:h-15 rounded-full object-cover shadow-md shadow-base-content' />
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-auto border-none shadow-md shadow-base-content rounded-sm">
            <table className="table text-nowrap">
              <thead className="bg-base-300 text-lg text-base-content">
                <tr>
                  <th>No.</th>
                  <th>Commentd At</th>
                  <th>Comment</th>
                  <th>Likes</th>
                  <th>Commented User</th>
                  <th>Post</th>
                  <th className="text-error">Delete</th>
                </tr>
              </thead>
              <tbody className='font-semibold'>
                {
                  comments.map((com, i) => (
                    <tr key={com._id}>
                      <td>{i + 1}</td>
                      <td>{new Date(com.createdAt).toLocaleDateString()}</td>
                      <td>{com.comment}</td>
                      <td>{com.totalLikes}</td>
                      <td >
                        <span className='flex items-center gap-1 mr-2'>
                          <img src={com.avatar} alt={com.username} className='w-8 h-8 object-cover rounded-full mt-1' />
                          <p>{com.username}</p>
                        </span>
                      </td>
                      <td>
                        <span className='flex items-center gap-1 mr-2'>
                          <img src={com.postImg} alt={com.postTitle} className='w-8 h-8 object-cover rounded-sm mt-1' />
                          <Link
                            to={`/post/${com.slug}`}
                            className="cursor-pointer link-hover"
                          >
                            {com.postTitle}
                          </Link>
                        </span>
                      </td>
                      <td>
                        <DeleteComment
                          comment={com}
                          setComments={setComments}
                          refresh={setRefresh}
                          setShowMore={setShowMore}
                          totalComs={totalComs}
                          setTotalComs={setTotalComs}
                          setFetchCount={setFetchCount}
                          className='text-error' />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Show More Button */}
          {showMore && (
            <Button
              onClick={handleShowMore}
              text={loadingMore ? <Loader /> : "Show More Users"}
              style="imp"
              className="mt-4"
            />
          )}
        </div>
      ) : (
        !loading &&
        firstFetchDone && (
          <div className="text-3xl text-center mt-8 md:mt-0">
            <span className='font-bold'>@{userInfo.username} </span>don't have any posts comments yet!
          </div>
        )
      )}
    </>
  )
}

export default AllComments