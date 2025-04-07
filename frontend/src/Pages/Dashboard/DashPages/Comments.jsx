import React, { useState, useEffect } from 'react'
import { DeleteComment, Loader, Button } from '../../../Components/CompsIndex.js'
import { API } from "../../../API/API.js";
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom';

const Comments = () => {
    const userId = useSelector(state => state.user?.currentUser?.data?.loggedInUser?._id)
    const [comments, setComments] = useState([])
    const [totalComs, setTotalComs] = useState(0)
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [firstFetchDone, setFirstFetchDone] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
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
            console.error(error?.response?.data?.message || "failed to fetch more posts")
        } finally {
            setLoadingMore(false)
        }
    }



    console.log(fetchCount)
    return (
        <>
            {loading && <Loader />}
            {comments.length > 0 ? (

                <div className="mt-12 lg:mt-0 lg:w-7xl w-full h-auto">
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
                                                    <Link
                                                        to={`/post/${com.userId}`}
                                                        className="cursor-pointer link-hover"
                                                    >
                                                        {com.username}
                                                    </Link>
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
                    <div className="font-bold text-3xl text-center">
                        We Dont't Have Any Posts Comments Yet!
                    </div>
                )
            )}
        </>
    )
}

export default Comments