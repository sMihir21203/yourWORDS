import React, { useEffect, useState } from 'react'
import { Button, Loader } from "../CompsIndex.js"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { API } from '../../API/API.js'
import Comment from './Comment.jsx'


const AddCommentSection = ({
    post,
    className = "",
    ...props
}) => {
    const postId = post._id
    const currentUser = useSelector(state => state?.user?.currentUser?.data?.loggedInUser);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [errMsg, setErrMsg] = useState(null)
    const [refresh, setRefresh] = useState(false)
    const [firstFetchDone, setFirstFetchDone] = useState(false)
    const [totalComs, setTotalComs] = useState(0)
    const [fetchCount, setFetchCount] = useState(0)
    const [showMore, setShowMore] = useState(false)
    const maxChar = 200;
    const [postComments, setPostComments] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!postId) return;
        if (errMsg) setErrMsg(null)
        const getPostComments = async () => {
            try {
                if (!firstFetchDone) setLoading(true);
                const { data } = await API.get(`/comment/${postId}/comments`)
                if (data) {
                    const postInfo = data.data
                    const comments = postInfo.postComments || []
                    const totalComs = postInfo.totalComments || 0

                    setPostComments(comments)
                    setFetchCount(comments.length)
                    setTotalComs(totalComs)
                    setShowMore(comments.length < totalComs)
                }
            } catch (error) {
                console.error(error)
                console.error(error?.response?.data?.message || "failed to getPostComments")
            } finally {
                setLoading(false)
                setFirstFetchDone(true)
                setRefresh(false)
            }
        }
        getPostComments();
    }, [postId, refresh])

    useEffect(() => {
        if (errMsg) {
            const timer = setTimeout(() => setErrMsg(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [errMsg]);


    const handleShowMore = async () => {
        const setStartIndex = postComments.length
        console.log(setStartIndex)
        try {
            setLoadingMore(true)
            const { data } = await API.get(`/comment/${postId}/comments?setStartIndex=${setStartIndex}`)
            if (data) {
                console.log(data)
                const morePostInfo = data.data
                const morePostComments = morePostInfo.postComments || []
                setPostComments((prev) => [...prev, ...morePostComments])
                setFetchCount((prev) => prev + morePostComments.length)
                setShowMore(postComments.length + morePostComments.length < totalComs)
            }
        } catch (error) {
            console.error(error)
            console.error(error?.response?.data?.message || "failed to fetch more posts comments")
        } finally {
            setLoadingMore(false)
        }
    }

    const handleOnSubmitAddComment = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return setErrMsg("Write Something to comment!");
        setLoading(true)
        try {
            const { data } = await API.post(`/comment/${postId}/add-comment`, { comment: comment.trim() })
            if (data) {
                setPostComments(prev => [data?.data, ...prev.slice(0, 8)])
                setComment("")
                setRefresh(true)
            }
        } catch (error) {
            console.error(error.response?.data?.message || "Failed to add Comment! try again!")
        } finally {
            setLoading(false)
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
            className={`${className} mt-8 self-center justify-self-center shadow-lg  p-4 rounded-box `}
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
                                className='text-xs link-hover font-bold italic mt-[2px]'
                            >
                                @{currentUser.username}
                            </Link>
                        </div>
                    ) : (
                        <div className='text-lg'>
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
            {errMsg && (
                <div role="alert" className="mb-2 alert alert-error alert-soft flex justify-center text-center">
                    {`👀 ${errMsg}`}
                </div>
            )}
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
                                className='w-25 rounded-sm shadow-base-content cursor-pointer'
                            />
                        </div>
                    </form>
                )
            }

            {/* showAllComments */}
            {
                postComments.length > 0
                    ? (
                        <>
                            <div className='flex items-center mt-4 mb-2 gap-1'>
                                <p className='mb-0.5'>Comments: </p>
                                <p className='px-2 shadow-xs shadow-base-content'>{totalComs}</p>
                            </div>
                            {
                                <ul className='list max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 pr-2'>
                                    {postComments.map(com => (
                                        <Comment
                                            key={com._id}
                                            currentUser={currentUser}
                                            post={post}
                                            comment={com}
                                            like={handleLikeComment}
                                            edit={handleEditComment}
                                            setComments={setPostComments}
                                            setRefresh={setRefresh}
                                            setShowMore={setShowMore}
                                            totalComs={totalComs}
                                            setTotalComs={setTotalComs}
                                            setFetchCount={setFetchCount}
                                        />
                                    ))}
                                </ul>
                            }
                            {showMore && (
                                <Button
                                    onClick={handleShowMore}
                                    text={loadingMore ? <Loader /> : "Show More Comments"}
                                    style="imp"
                                    className="mt-4"
                                />
                            )}
                        </>
                    )
                    : (
                        !loading &&
                        firstFetchDone && (
                            <p className='mt-4 text-xl font-semibold'>No Comments!</p>
                        )
                    )
            }
        </div>
    )
}

export default AddCommentSection