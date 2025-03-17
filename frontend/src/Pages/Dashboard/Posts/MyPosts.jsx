import React, { useEffect, useState, useRef } from "react";
import { DashContainer } from "../DashIndex.js";
import { Button, DeletePost, Loader } from "../../../Components/CompsIndex.js";
import { API } from "../../../API/API.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const userId = useSelector((state) => state.user.currentUser?.data?.loggedInUser?._id);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstFetchDone, setFirstFetchDone] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (userId) getUserPosts();
  }, [userId]);

  const getUserPosts = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/user/${userId}/posts`);
      console.log("API Response: ", res.data.data);

      const posts = res.data.data?.userPosts || [];
      setUserPosts(posts);
      setFirstFetchDone(true);
      setShowMore(posts.length >= 9);
    } catch (error) {
      console.log(error.response?.data?.message || "No posts found.");
      setFirstFetchDone(true);  // ✅ Ensure message shows when no posts
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = async () => {
    const setStartIndex = userPosts.length;
    setLoading(true);
    try {
      const res = await API.get(`/user/${userId}/posts?setStartIndex=${setStartIndex}`);
      console.log("More User Posts: ", res.data.data);

      const morePosts = res.data.data?.userPosts || [];
      setUserPosts((prev) => [...prev, ...morePosts]);
      setShowMore(morePosts.length >= 9);
    } catch (error) {
      console.log(error.response?.data?.message || "No more posts available.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashContainer>
      {loading && <Loader />}

      {userPosts.length > 0 && (
        <div className="w-sm md:min-w-full h-auto">
          <div className="overflow-x-auto overflow-y-auto border-none shadow-md shadow-base-content rounded-sm">
            <table className="table text-nowrap">
              <thead className="bg-base-300 text-lg text-base-content">
                <tr>
                  <th>No.</th>
                  <th>Published On</th>
                  <th>Post</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {userPosts.map((post, index) => (
                  <tr key={post._id}>
                    <td>{index + 1}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/post/${post.slug}`} className="link-hover">
                        {post.postTitle}
                      </Link>
                    </td>
                    <td>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.postImg} alt={post.postTitle} className="w-12 rounded-sm hover:scale-105" />
                      </Link>
                    </td>
                    <td>{post.postCategory}</td>
                    <td>
                      <Link to={`/post/${post.slug}`} className="link-hover text-success">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <DeletePost postId={post._id} userId={userId} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Show More Button (Only when needed) */}
          {showMore && (
            <Button
              onClick={handleShowMore}
              text={loading ? <Loader /> : "Show More Posts"}
              style="imp"
              className="mt-4"
            />
          )}
        </div>
      )}

      {!loading && firstFetchDone && userPosts.length === 0 && (
        <div className="font-bold flex flex-col text-center gap-y-4">
          <div className="text-5xl">
            You Have Not Created<br />Any Posts Yet!
          </div>
          <Link to="/dashboard?tab=create-post">
            <Button
              text="Create Post"
              className="w-32 text-xl text-white pb-1 bg-gradient-to-br hover:bg-gradient-to-r from-[#ff007f] via-sky-300 to-[#003cff] hover:text-transparent hover:bg-clip-text"
            />
          </Link>
        </div>
      )}
    </DashContainer>
  );
};

export default MyPosts;
