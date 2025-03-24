import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../Components/Button'

const MoreUserPosts = ({
    className = "",
    ...props
}) => {
    const currentUser = useSelector(state => state?.user?.currentUser?.data?.loggedInUser)
    return (
        <div className='text-nowrap flex flex-col-reverse md:flex-row w-fit p-4 mt-12 self-center justify-self-center place-content-center items-center shadow-md shadow-base-content gap-6 md:gap-12 rounded-tr-2xl rounded-bl-2xl'>
            <div className='text-lg flex-1'>
                <p>Want See More Posts From <span className='font-bold text-xl'>{currentUser.username}?</span></p>
                <div>
                    <p>
                        Checkout Here!
                    </p>
                    <Button
                        text="More Posts"
                        style='gradient'
                        className='rounded-tl-none rounded-br-none'
                    />
                </div>
            </div>
            <div className='flex-1'>
                <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className='w-24 h-24 rounded-full'
                />
            </div>
        </div>
    )
}

export default MoreUserPosts