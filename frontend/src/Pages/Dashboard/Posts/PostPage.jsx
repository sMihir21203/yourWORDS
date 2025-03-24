import "./PostPage.css"
import React, { useEffect, useState } from 'react'
import { AddCommentSection, Container } from "../../../Components/CompsIndex"
import { useParams, Link } from 'react-router-dom'
import { API } from '../../../API/API'
import { MoreUserPosts } from "./PostIndex.js"

const PostPage = () => {
  const { slug } = useParams()
  const [postInfo, setPostInfo] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!slug) return
    getPostInfo()
  }, [slug])

  const getPostInfo = async () => {
    setLoading(true)
    try {
      const { data } = await API.get(`/user/posts?slug=${slug}`)
      if (data) {
        const postInfo = data?.data?.userPosts?.[0] || []
        setPostInfo(postInfo);
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "Failed to getPostInfo! try again!")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container>
      <div className='text-center space-y-2'>
        <h1
          className='text-xl md:text-3xl font-bold shadow-sm rounded-sm'
        >{postInfo.postTitle}
        </h1>
        <img
          src={postInfo.postImg}
          alt={postInfo.postTitle}
          className='rounded-md shadow-sm shadow-base-content'
        />
        <p
          className='border-b-1 flex justify-between font-semibold text-xs md:text-sm'
        >
          <span>{new Date(postInfo.createdAt).toLocaleDateString()}</span>
          <Link
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
        <MoreUserPosts />
        <AddCommentSection
          postId={postInfo._id}
        />
      </div>
    </Container>
  )
}

export default PostPage