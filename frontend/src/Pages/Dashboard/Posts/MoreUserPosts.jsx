import React from 'react'
import { Button } from '../../../Components/CompsIndex.js'
import { useLocation, useNavigate } from 'react-router-dom'

const MoreUserPosts = ({
    className = "",
    author,
    ...props
}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleGetMoreUserPosts = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', author.username)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    return (
        <div className='text-lg flex flex-col-reverse md:flex-row text-center text-nowrap  w-full p-4 md:p-6 px-6 md:px-48 mt-12 self-center justify-self-center place-content-center items-center shadow-sm shadow-base-content gap-2 md:gap-8 rounded-tr-2xl rounded-bl-2xl'>
            <div>
                <p>Want See More Posts From <span className='font-bold text-xl'>{author.username}?<br /></span>Checkout Here!</p>
                <Button
                    text="More Posts"
                    className='px-1 rounded-tl-none rounded-br-none w-fit self-center justify-self-center'
                    onClick={handleGetMoreUserPosts}
                />
            </div>
            <img
                src={author.avatar}
                alt={author.username}
                className='w-24 h-24 rounded-full shadow-sm shadow-base-content'
            />
        </div>
    )
}

export default MoreUserPosts