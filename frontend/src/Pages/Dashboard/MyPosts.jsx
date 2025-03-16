import React, { useEffect, useState, useRef } from "react";
import { DashContainer } from "./DashIndex.js";
import { Button, Loader } from "../../Components/CompsIndex.js";
import { API } from "../../API/API.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyPosts = () => {
  const userId = useSelector((state) => state.user.currentUser?.data?.loggedInUser?._id);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstFetchDone, setFirstFetchDone] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const modalRef = useRef(null);

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

  const handleDelete = async () => {
    return alert("Radhe Radhe")
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
                      <Link to={`/post/${post.slug}`} className="link-hover border-b-base-content">
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
                      <Link to={`/post/${post.slug}`} className="link-hover border-b-base-content text-success">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <span
                        onClick={() => {
                          setPostToDelete(post._id);
                          modalRef.current.showModal();
                        }}
                        className="link link-hover border-b-base-content text-error"
                      >
                        Delete
                      </span>
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

      {/* Delete Confirmation Modal */}
      <dialog ref={modalRef} className="modal text-center">
        <div className="modal-box rounded-xl">
          <form method="dialog" className="flex flex-col items-center space-y-2">
            <p className="py-4 font-bold">Are You Sure?<br />You Want to Delete This Post?</p>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-dash btn-error h-8 w-28 text-nowrap rounded-lg"
            >
              Confirm Delete
            </button>
          </form>
          <div className="modal-action">
            <Button
              text="Cancel"
              className="w-20"
              onClick={() => modalRef.current.close()}
            />
          </div>
        </div>
      </dialog>
    </DashContainer>
  );
};

export default MyPosts;
