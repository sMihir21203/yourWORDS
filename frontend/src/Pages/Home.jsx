import React, { useEffect, useState } from 'react';
import { API } from '../API/API.js';
import { PostCard } from './Dashboard/Posts/PostIndex.js';
import { Searchbar } from '../Components/CompsIndex.js';

const Home = () => {
  const [recentPostsData, setRecentPostsData] = useState([]);
  const [mythologyPostsData, setMythologyPostsData] = useState([]);

  useEffect(() => {
    getRecentPosts();
    getMythologyPosts();
  }, []);

  const getRecentPosts = async () => {
    try {
      const { data } = await API.get(`user/posts?setLimit=5`);
      if (data) {
        const recentPosts = data.data.userPosts || [];
        setRecentPostsData(recentPosts);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to get posts for home page");
    }
  };

  const getMythologyPosts = async () => {
    try {
      const category = "Mythology";  // Define the category
      const limit = 5;

      const { data } = await API.get(`user/posts?category=${category}&setLimit=${limit}`);

      if (data) {
        const mythologyPosts = data.data.userPosts || [];
        setMythologyPostsData(mythologyPosts);
      }
    } catch (error) {
      console.error(error?.response?.data?.message || "Failed to get mythology posts");
    }
  };

  return (
    <div className='p-4 pt-21 space-y-8 flex flex-col items-center'>
      <div className='flex flex-col justify-between items-center p-4 w-full h-[400px] shadow-md shadow-base-content rounded-md'>
        <div>
          <h1 className='text-7xl'>
            Welcome to YourWORDS
          </h1>
        </div>
        <Searchbar />
      </div>
      <div className="flex flex-col items-center justify-center">
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
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-2">Mythology WORDS</h1>
        <div className=" flex flex-wrap justify-center">
          {
            mythologyPostsData &&
            mythologyPostsData.map(post => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
