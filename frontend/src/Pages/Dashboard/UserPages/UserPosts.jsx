import React, { useState, useEffect } from 'react'
import { Loader, Button, DeletePost, PageTitle } from '../../../Components/CompsIndex.js'
import { API } from "../../../API/API.js";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const tab = searchParams.get('tab')
  const userInfoId = tab?.includes('/') ? tab.split('/')[1] : null
  const userId = useSelector(state => state.user?.currentUser?.data?.loggedInUser?._id)
  const [posts, setPosts] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [firstFetchDone, setFirstFetchDone] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await API.get(`/user/${userInfoId}`)
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
        if (!firstFetchDone) setLoading(true)

        const { data } = await API.get(`/user/posts?userId=${userInfoId}`)
        if (data) {
          const postsInfo = data?.data?.userPosts || []
          const totalPosts = data?.data?.totalPosts || 0

          setPosts(postsInfo)
          setFetchCount(postsInfo.length)
          setTotalPosts(totalPosts)
          setShowMore(postsInfo.length < totalPosts)
        }
      } catch (error) {
        console.error(error)
        console.error(error?.response?.data?.message || "failed to fetch all posts")
      } finally {
        setLoading(false)
        setFirstFetchDone(true)
      }
    }
    getUserInfo()
    getPosts()
  }, [refresh])

  const handleShowMore = async () => {
    const setStartIndex = posts.length
    try {
      setLoadingMore(true)
      const { data } = await API.get(`/user/posts?userId=${userInfoId}&setStartIndex=${setStartIndex}`)
      if (data) {
        const morePostsInfo = data?.data?.userPosts || []
        setPosts((prev) => [...prev, ...morePostsInfo])
        setFetchCount((prev) => prev + morePostsInfo.length)
        setShowMore(posts.length + morePostsInfo.length < totalPosts)
      }
    } catch (error) {
      console.error(error)
      console.error(error?.response?.data?.message || "failed to fetch more posts")
    } finally {
      setLoadingMore(false)
    }
  }
  return (
    <>
    <PageTitle title={`Posts: @${userInfo.username}`}/>
      {loading && <Loader />}
      {posts.length > 0 ? (

        <div className="w-sm md:w-lg lg:w-7xl">
          <div className='text-center font-semibold text-4xl'>Posts</div>
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
                  <th>Published On</th>
                  <th>Post</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th className="text-error">Delete</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {posts.map((post, i) => (
                  <tr key={post._id}>
                    <td>{i + 1}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/post/${post.slug}`} className="link-hover">
                        {post.postTitle}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.postImg} alt={post.postTitle} className="w-12 rounded-sm hover:scale-105" />
                      </Link>
                    </td>
                    <td>{post.postCategory}</td>
                    <td>
                      <DeletePost postId={post._id} userId={userId} />
                    </td>
                  </tr>
                ))}
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
            <span className='font-bold'>@{userInfo.username} </span>not created any posts yet!
          </div>
        )
      )}
    </>
  )
}

export default AllPosts