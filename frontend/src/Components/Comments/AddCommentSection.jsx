import React, { useEffect, useState } from 'react'
import { Button, Loader } from "../CompsIndex.js"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../API/API.js'
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
    const navigate = useNavigate()

    useEffect(() => {
        if (!postId) return;
        getPostComments();
    }, [postId])

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

    const handleLikeComment = async (commentId) => {
        if (!currentUser) return navigate('/sign-in');
        try {
            const { data } = await API.put(`/comment/${commentId}/like`)
            if (data) {
                const updatedCom = data?.data
                setPostComments(prevCom => prevCom.map(com =>
                    com._id === commentId
                        ? {
                            ...com,
                            likes: updatedCom.likes,
                            totalLikes: updatedCom.totalLikes
                        } : com
                ));
            }
        } catch (error) {
            console.error(error.response?.data?.message || "failed to likeComment")
        }
    }

    const handleEditComment = (comment, editedComment) => {
        setPostComments(prevCom => prevCom.map(com =>
            com._id === comment._id
                ? {
                    ...com,
                    comment: editedComment
                } : com
        ))
    };
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
                        <div className='flex justify-between mt-2 items-center mx-2'>
                            <p className="text-xs opacity-70">
                                {maxChar - comment.length} characters remaining
                            </p>
                            <Button
                                text={loading ? <Loader /> : "Comment"}
                                className='w-fit px-2 rounded-sm bg-gradient-to-r from-[#ff007f] via-sky-300 to-[#003cff] text-transparent bg-clip-text shadow-sky-300'
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
                        <div className='flex items-center mt-4 mb-2 gap-1'>
                            <p className='mb-0.5'>Comments: </p>
                            <p className='px-2 shadow-xs shadow-base-content'>{postComments.length}</p>
                        </div>
                        {
                            <ul className='list bg-base-100 rounded-box shadow-md'>
                                {postComments.map(com => (
                                    <Comment
                                        key={com._id}
                                        currentUser={currentUser}
                                        postId={postId}
                                        comment={com}
                                        like={handleLikeComment}
                                        edit={handleEditComment}
                                        setComments={setPostComments}
                                    />
                                ))}
                            </ul>
                        }
                    </>
                )
            }
        </div>
    )
}

export default AddCommentSection