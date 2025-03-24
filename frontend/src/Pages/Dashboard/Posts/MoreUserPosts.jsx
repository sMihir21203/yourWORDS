import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../Components/Button'

const MoreUserPosts = ({
    className = "",
    ...props
}) => {
    const currentUser = useSelector(state => state?.user?.currentUser?.data?.loggedInUser)
    return (
        <div className='text-lg flex flex-col-reverse md:flex-row text-center text-nowrap  w-full p-4 md:p-6 px-6 md:px-48 mt-12 self-center justify-self-center place-content-center items-center shadow-md shadow-base-content gap-2 md:gap-8 rounded-tr-2xl rounded-bl-2xl'>
            <div>
                <p>Want See More Posts From <span className='font-bold text-xl'>{currentUser.username}?<br /></span>Checkout Here!</p>
                <Button
                    text="More Posts"
                    style='gradient'
                    className='rounded-tl-none rounded-br-none'
                />
            </div>
            <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className='w-24 h-24 rounded-full'
            />
        </div>
    )
}

export default MoreUserPosts