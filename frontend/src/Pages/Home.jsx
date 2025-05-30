import React, { useEffect, useState } from 'react';
import { API } from '../API/API.js';
import { PostCard } from './Dashboard/Posts/PostIndex.js';
import { Searchbar, PageTitle,Loader } from '../Components/CompsIndex.js';

const Home = () => {
  const [recentPostsData, setRecentPostsData] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRecentPosts();
  }, []);

  const getRecentPosts = async () => {
    try {
      setLoading(true)
      const { data } = await API.get(`user/posts?setLimit=8`);
      if (data) {
        const recentPosts = data.data.userPosts || [];
        setRecentPostsData(recentPosts);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to get posts for home page");
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      <PageTitle title="Home" />
      <div className='p-4 pt-21 space-y-8 flex flex-col items-center'>
        <div className='flex flex-col justify-between items-center p-4 w-full h-fit shadow-md shadow-base-content rounded-md'>
          <div className="flex flex-col items-center gap-2 mb-6 lg:mb-8">
            <h1 className='text-3xl lg:text-7xl'>
              Welcome to YourWORDS
            </h1>
            <p className='text-sm lg:text-2xl'>"Write Freely. Speak Boldly. Live YourWORDS."</p>
          </div>
          <Searchbar />
        </div>
        {
          loading
            ? <Loader />
            : <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold mb-2">Recent WORDS</h1>
              <div className=" flex flex-wrap justify-center">
                {
                  recentPostsData &&
                  recentPostsData.map(post => (
                    <PostCard
                      key={post._id}
                      post={post}
                    />
                  ))
                }
              </div>
            </div>
        }
      </div>
    </>
  );
};

export default Home;
