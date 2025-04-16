import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'

const Searchbar = ({
    className = ""
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromURL = urlParams.get('searchTerm')
        if (searchTermFromURL) {
            setSearchTerm(searchTermFromURL)
        }
    }, [location.search])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    return (
        <form
            onSubmit={handleOnSubmit}
            className={`${className}w-sm md:w-2xl lg:w-4xl p-2 flex items-center rounded-lg h-12 shadow-xs shadow-base-content`}>
            <input
                placeholder='FIND your READ...'
                className='border-none outline-none w-full'
                id='searchTerm'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                type='submit'
            >
                <AiOutlineSearch size={30} className='cursor-pointer' />
            </button>
        </form>
    )
}

export default Searchbar