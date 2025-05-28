import React, { useState, useEffect } from 'react'
import { Loader, Button, DeletePost, PageTitle } from '../../../Components/CompsIndex.js'
import { API } from "../../../API/API.js";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllPosts = () => {
  const currentUser = useSelector(state => state.user?.currentUser?.data?.loggedInUser)
  const [posts, setPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [firstFetchDone, setFirstFetchDone] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getPosts = async () => {
      try {
        if (!firstFetchDone) setLoading(true)

        const { data } = await API.get(`/user/posts?userId=${currentUser._id}`)
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
    getPosts()
  }, [refresh])

  const handleShowMore = async () => {
    const setStartIndex = posts.length
    try {
      setLoadingMore(true)
      const { data } = await API.get(`/user/posts?userId=${currentUser._id}&setStartIndex=${setStartIndex}`)
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
      <PageTitle title={`Posts: ${currentUser.username}`} />
      {loading && <Loader />}
      {posts.length > 0 ? (

        <div className="mt-12 lg:mt-0 w-sm md:w-lg lg:w-7xl">
          <div className="overflow-x-auto overflow-y-auto border-none shadow-md shadow-base-content rounded-sm">
            <table className="table text-nowrap">
              <thead className="bg-base-300 text-lg text-base-content">
                <tr>
                  <th>No.</th>
                  <th>Published On</th>
                  <th>Post</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th className="text-success">Edit</th>
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
                      <Link to={`/update-post/${post.slug}`} className="link-hover text-success">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <DeletePost postId={post._id} userId={currentUser._id} />
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
          <div className="text-center space-y-12">
            <p className='font-bold text-3xl'>Share YourWORDS with world!</p>
            <span>
              <Link 
              to="/share-words"
              className='link-hover text-blue-600'
              >
              Share Your First Words!
              </Link>
            </span>
          </div>
        )
      )}
    </>
  )
}

export default AllPosts