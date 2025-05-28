import "./PostPage.css"
import React, { useEffect, useState } from 'react'
import { AddCommentSection, Container, Loader, PageTitle } from "../../../Components/CompsIndex"
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom'
import { API } from '../../../API/API'
import { MoreUserPosts, PostCard } from "./PostIndex.js"

const PostPage = () => {
  const { slug } = useParams()
  const [loading, setLoading] = useState(false)
  const [postInfo, setPostInfo] = useState([])
  const [authorInfo, setAuthorInfo] = useState([])
  const [recentPostsInfo, setRecentPostsInfo] = useState([])

  useEffect(() => {
    if (!slug) return

    const getPostInfo = async () => {
      setLoading(true)
      try {
        const { data } = await API.get(`/user/posts?slug=${slug}`)
        if (data) {
          const postData = data?.data?.userPosts?.[0] || []
          getAuthorInfo(postData.userId)
          setPostInfo(postData);
        }
      } catch (error) {
        console.log(error?.response?.data?.message || "Failed to getPostInfo! try again!")
      } finally {
        setLoading(false)
      }
    }

    const getAuthorInfo = async (authorId) => {
      try {
        const { data } = await API.get(`/user/${authorId}`)
        if (data) {
          setAuthorInfo(data.data)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to get author info")
      }
    }

    getPostInfo()
  }, [slug])

  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const { data } = await API.get(`/user/posts/?setLimit=${3}`)
        if (data) {
          setRecentPostsInfo(data.data.userPosts)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || "failed to fetch recent post")
      }
    }
    getRecentPosts()
  }, [])

  const location = useLocation()
  const navigate = useNavigate()

  const handleGetMoreCategoryPosts = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('category', postInfo.postCategory)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  return (
    <div className="mt-20 mx-auto w-sm md:w-lg lg:w-7xl">
      <PageTitle title={`${postInfo.postTitle}`} />
      {
        loading
          ? <Loader />
          : <div className='space-y-2'>
            <h1
              className='text-center text-xl md:text-3xl font-bold shadow-sm rounded-sm' 
            >{postInfo.postTitle}
            </h1>
            <img
              src={postInfo.postImg}
              alt={postInfo.postTitle}
              className='w-sm md:w-full rounded-md shadow-sm shadow-base-content self-center justify-self-center'
            />
            <p
              className='border-b-1 flex justify-between font-semibold text-xs md:text-sm'
            >
              <span>{new Date(postInfo.createdAt).toLocaleDateString()}</span>
              <Link
                onClick={handleGetMoreCategoryPosts}
                className='tooltip tooltip-left hover:scale-105 hover:font-bold'
                data-tip={`See More ${postInfo.postCategory} Related Post?`}
              >
                {postInfo.postCategory}
              </Link>
            </p>
            <div
              className='postContent text-start md:text-lg'
              dangerouslySetInnerHTML={{ __html: postInfo.postContent }}
            />
            <MoreUserPosts author={authorInfo} />

            {/* commentSection */}
            <AddCommentSection
              post={postInfo}
            />


            {/* recentPosts */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold mt-9 mb-4">Recent WORDS</h1>
              <div className=" flex flex-wrap justify-center">
                {
                  recentPostsInfo &&
                  recentPostsInfo.map(post => (
                    <PostCard
                      key={post._id}
                      post={post}
                    />
                  ))
                }
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default PostPage