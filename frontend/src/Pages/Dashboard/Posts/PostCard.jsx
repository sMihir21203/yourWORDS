import React, { useEffect, useState } from 'react'
import { Button } from '../../../Components/CompsIndex.js'
import { Link } from 'react-router-dom'
import { API } from '../../../API/API.js'

const PostCard = ({ post }) => {
    const [author, setAuthor] = useState([])
    useEffect(() => {
        const getAuthoInfo = async () => {
            try {
                const { data } = await API.get(`/user/${post.userId}`)
                if (data) {
                    setAuthor(data.data)
                }
            } catch (error) {
                console.error(error?.response?.data?.message || "Failed to fetch user for post card")
            }
        }
        getAuthoInfo()
    }, [post])
    return (
        <div className='group relative w-xs h-[450px] overflow-hidden p-3 shadow-sm shadow-base-content mx-2 my-2 rounded-md rounded-br-none rounded-tl-none'>
            <Link to={`/post/${post.slug}`}>
                <img
                    src={post.postImg}
                    alt={post.username}
                    className='h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20 shadow-xs shadow-base-content rounded-md rounded-br-none rounded-tl-none'
                />
            </Link>
            <div className='p-2 flex flex-col gap-2'>
                <p className='text-lg font-semibold line-clamp-1'>{post.postTitle}</p>
                <p className='line-clamp-3'
                    dangerouslySetInnerHTML={{ __html: post.postContent }}
                ></p>
                <div className='flex items-center justify-between text-xs'>
                    <span className='mb-1 italic'>{post.postCategory}</span>
                    <div className='flex items-center gap-0.5'>
                        By.<img
                            src={author.avatar}
                            alt={author.username}
                            className='pl-0.5 w-5 h-5 object-cover rounded-full'
                        />
                        <span className='mb-1'>{author.username}</span>
                    </div>
                </div>
                <Button
                    text="Read WORDS"
                    to={`/post/${post.slug}`}
                    className='w-fit px-24 z-10 text-nowrap self-center justify-self-center -bottom-24 group-hover:bottom-4 absolute transition-all duration-300 rounded-md rounded-br-none rounded-tl-none'
                />

            </div>
        </div>
    )
}

export default PostCard