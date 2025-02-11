import React from 'react'
import { Link } from "react-router-dom"

const Logo = ({

    to = "/",
    className = "",
    ...props
}) => {
    return (
        <div className={`self-center whitespace-nowrap text-2xl sm:text-3xl font-extrabold dark:text-white ${className}`
        }
            {...props}>
            <Link
                to={to}
            >
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-l-lg text-white font-semibold'>
                    Your
                </span>
                WORDS
            </Link >
        </div>
    )
}

export default Logo