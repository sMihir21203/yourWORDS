import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { API } from '../API/API.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../Components/CompsIndex.js'
import { PostCard } from './Dashboard/Posts/PostIndex.js'

const Search = () => {

    const [filterData, setFilterData] = useState({
        searchTerm: "",
        sort: "desc",
        category: "uncategorized"
    })
    const [loading, setLoading] = useState(false)
    const [showMoreloading, setShowMoreLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(0)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchFromURL = urlParams.get('searchTerm')
        const sortFromURL = urlParams.get('sort')
        const categoryFromURL = urlParams.get('category')

        if (searchFromURL || sortFromURL || categoryFromURL) {
            setFilterData(prev => ({
                ...prev,
                searchTerm: searchFromURL,
                sort: sortFromURL,
                category: categoryFromURL
            }))
        }
        const getPosts = async () => {
            const searchQuery = urlParams.toString()
            console.log(searchQuery)
            try {
                const { data } = await API.get(`/user/posts?${searchQuery}`)
                if (data) {
                    const postData = data.data?.userPosts || []
                    const totalPosts = data.data?.totalPosts || 0

                    setPosts(postData)
                    setTotalPosts(totalPosts)
                    setShowMore(postData.length < totalPosts)
                }
            } catch (error) {
                console.log(error)
                console.log(error?.response?.data?.message || "failed to fetch searchTerm Comment")
            }
        }
        getPosts()
    }, [location.search])

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        if (id === 'searchTerm') {
            setFilterData((prev) => ({ ...prev, searchTerm: value }))
        }
        if (id === 'sort') {
            setFilterData((prev) => ({ ...prev, sort: value }))
        }
        if (id === 'category') {
            setFilterData((prev) => ({ ...prev, category: value }))
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', filterData.searchTerm)
        urlParams.set('sort', filterData.sort)
        urlParams.set('category', filterData.category)

        const searchQuery = urlParams.toString()
        console.log(searchQuery)
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async () => {
        const setStartIndex = totalPosts;
        const urlParams = new URLSearchParams()
        urlParams.set('setStartIndex', setStartIndex)
        const searchQuery = urlParams.toString()
        try {
            const { data } = await API.get(`/user/posts/${searchQuery}`);
            if (data) {
                const morePosts = data?.data?.userPosts || []
                setPosts(prev => [...prev, ...morePosts])
                setShowMore(posts.length + morePosts.length < totalPosts)
            }
        } catch (error) {
            console.error(error)
            console.error(error?.response?.data?.message || "failed to fetch more posts")
        }
    }

    return (
        <div className='p-4 pt-21 flex flex-col justify-center items-center space-y-4'>
            <form
                onSubmit={handleOnSubmit}
                className={`p-4 flex flex-col items-center justify-center gap-2 lg:gap-8 shadow-sm shadow-base-content rounded-md`}>
                <div
                    className='w-sm md:w-2xl lg:w-4xl p-2 flex items-center rounded-lg h-12 shadow-xs shadow-base-content'>
                    <input
                        placeholder='FIND your READ...'
                        className='border-none outline-none w-full'
                        id='searchTerm'
                        value={filterData.searchTerm}
                        onChange={handleOnChange}
                    />
                    <button
                        type='submit'
                    >
                        <AiOutlineSearch size={30} className='cursor-pointer' />
                    </button>
                </div>
                <div className='flex flex-wrap items-center gap-4 lg:gap-2'>
                    <div className="flex items-center gap-1">
                        <span>Category:</span>
                        <select
                            value={filterData.category}
                            id='category'
                            onChange={handleOnChange}
                            className="select rounded-lg">
                            <option>Uncategorized</option>
                            <option value="Mythology">Mythology</option>
                            <option value="sports">Sports</option>
                            <option value="reactjs">React JS</option>
                            <option value="web-development">Web Development</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>Order:</span>
                        <select
                            value={filterData.sort}
                            id='sort'
                            onChange={handleOnChange}
                            className="select rounded-lg">
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </select>
                    </div>
                    <div>
                        <Button
                            text='Apply'
                            type="submit"
                            style='gradient'
                            className='px-2 mb-1'
                        />
                    </div>
                </div>
            </form>
            <div>
                <h1 className='text-2xl font-semibold text-center'>Search Results:</h1>
                <div>
                    {
                        loading && (
                            <p className='text-center font-bold text-2xl md:text-5xl animate-pulse'>Creating Your Post...</p>
                        )
                    }
                    {
                        !loading && posts.length === 0 && (
                            <h1>No Posts Found</h1>
                        )
                    }
                    <div className='flex flex-wrap justify-center'>
                        {
                            !loading
                            && posts
                            && posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                />
                            ))
                        }
                    </div>
                    {
                        showMore && (
                            <Button
                                onClick={handleShowMore}
                                text='Show More Posts'
                                style='imp'
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Search