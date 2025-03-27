import React from 'react'
import {Button} from '../../../Components/CompsIndex.js'

const MoreUserPosts = ({
    className = "",
    author,
    ...props
}) => {
    return (
        <div className='text-lg flex flex-col-reverse md:flex-row text-center text-nowrap  w-full p-4 md:p-6 px-6 md:px-48 mt-12 self-center justify-self-center place-content-center items-center shadow-md shadow-base-content gap-2 md:gap-8 rounded-tr-2xl rounded-bl-2xl'>
            <div>
                <p>Want See More Posts From <span className='font-bold text-xl'>{author.username}?<br /></span>Checkout Here!</p>
                <Button
                    text="More Posts"
                    style='gradient'
                    className='rounded-tl-none rounded-br-none'
                />
            </div>
            <img
                src={author.avatar}
                alt={author.username}
                className='w-24 h-24 rounded-full'
            />
        </div>
    )
}

export default MoreUserPosts