import React, { useEffect, useState } from 'react'
import Button from '../Button'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { API } from '../../API/API.js'
import Loader from '../Loader.jsx'
import Comment from './Comment.jsx'

const AddCommentSection = ({
    postId,
    className = "",
    ...props
}) => {
    const currentUser = useSelector(state => state?.user?.currentUser?.data?.loggedInUser);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false)
    const maxChar = 200;
    const [postComments, setPostComments] = useState([])

    useEffect(() => {
        if (!postId) return;
        getPostComments();
    }, [postId])

    const getPostComments = async () => {
        try {
            const { data } = await API.get(`/comment/${postId}/comments`)
            if (data) {
                const comments = data?.data || []
                setPostComments(comments)
            }
        } catch (error) {
            console.log(error?.response?.data?.message || "failed to getPostComments")
        }
    }

    const handleOnSubmitAddComment = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return;
        setLoading(true)
        try {
            const { data } = await API.post(`/comment/${postId}/add-comment`, { comment: comment.trim() })
            if (data) {
                setPostComments(prev => [data?.data, ...prev])
                setComment(() => "")
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Failed to add Comment! try again!")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div
            className={`${className}mt-8 self-center justify-self-center`}
            {...props}>

            {/* toShow signed in user */}
            {
                currentUser ?
                    (
                        <div className="flex mb-2 text-sm gap-1 items-center">
                            <p>Signed in as: </p>
                            <img
                                src={currentUser.avatar}
                                alt={currentUser.username}
                                className='w-5 h-5 object-cover rounded-full mt-[3px]'
                            />
                            <Link
                                to='/dashboard?tab=profile'
                                className='text-xs link-hover text-accent-content mt-[2px]'
                            >
                                @{currentUser.username}
                            </Link>
                        </div>
                    ) : (
                        <div className='text-lg text-accent-content'>
                            You must need to <span>
                                <Link
                                    to='/sign-in'
                                    className='link-hover text-blue-600 font-semibold'>
                                    Sign In
                                </Link> </span>
                            to <span className='font-semibold'>Comment!</span></div>
                    )
            }

            {/* addComments section */}
            {
                currentUser &&
                (
                    <form
                        onSubmit={handleOnSubmitAddComment}
                        className='p-2 md:p-4 flex flex-col w-fit shadow-sm shadow-base-content rounded-sm'>
                        <textarea
                            required
                            maxLength={200}
                            placeholder='Add Comment...'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            className='w-xs md:w-2xl rounded-sm h-16 p-2 border-none outline-none shadow-xs shadow-base-content text-sm'
                        />
                        <div className='flex justify-between mt-4 items-center'>
                            <p className='text-sm'>
                                {maxChar - comment.length} characters remaining
                            </p>
                            <Button
                                text={loading ? <Loader /> : "Comment"}
                                className='w-20 h-10 px-2 rounded-sm hover:text-info'
                                disabled={!comment.trim()}
                            />
                        </div>
                    </form>
                )
            }

            {/* showAllComments */}
            {
                !postComments.length ? (
                    <p className='mt-4 text-xl font-semibold'>No Comments!</p>
                ) : (
                    <>
                        <div className='flex items-center mt-4 gap-1'>
                            <p className='mb-0.5'>Comments: </p>
                            <p className='px-2 shadow-xs shadow-base-content'>{postComments.length}</p>
                        </div>
                        {
                            postComments.map(com => (
                                <Comment
                                    key={com._id}
                                    comment={com}
                                />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default AddCommentSection