import React, { useEffect, useState } from 'react';
import { Button, Container, Loader, PageTitle, TextEditor } from '../../../Components/CompsIndex.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API } from '../../../API/API';

const UpdatePost = () => {
  const userId = useSelector(state => state.user?.currentUser?.data?.loggedInUser?._id);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [updatePostData, setUpdatePostData] = useState({
    postTitle: "",
    postCategory: "Uncategorized",
    postImg: null,
    postContent: ""
  });

  const [updatePostErrMsg, setUpdatePostErrMsg] = useState(null);
  const [previewUpdatePostImg, setPreviewUpdatePostImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const validImgTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 1 * 1024 * 1024; // 1MB
  const minSize = 500 * 1024;  // 500KB

  useEffect(() => {
    if (!userId || !slug) {
      console.error("Missing userId or postId!");
      return;
    }

    const getPost = async () => {
      try {
        const res = await API.get(`/user/posts?slug=${slug}`);
        if (res?.data?.data?.userPosts?.length > 0) {
          const post = res.data.data.userPosts[0];
          // console.log("Fetched post:", post);

          setUpdatePostData({
            postTitle: post.postTitle || "",
            postCategory: post.postCategory || "Uncategorized",
            postImg: post.postImg || null,
            postContent: post.postContent || ""
          });

          // console.log(updatePostData);

          setPreviewUpdatePostImg(post.postImg);
        } else {
          console.error("Post not found!");
          setUpdatePostErrMsg("Post not found!");
        }
      } catch (error) {
        console.error("Error fetching post:", error.response?.data?.message || error.message);
        setUpdatePostErrMsg(error.response?.data?.message || "Failed to fetch post");
      }
    };

    getPost();
  }, [slug]);

  const handleOnChangeUpdatePostData = (e, editorContent = null) => {
    if (editorContent !== null) {
      setUpdatePostData(prev => ({
        ...prev,
        postContent: editorContent
      }));
      return;
    }

    const { id, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];

      if (!validImgTypes.includes(file.type)) {
        alert("Invalid file type! Please upload JPEG, JPG, or PNG.");
        return;
      }

      if (file.size < minSize || file.size > maxSize) {
        alert("Post Image size must be between 500KB and 1MB.");
        return;
      }

      setPreviewUpdatePostImg(URL.createObjectURL(file));
      setUpdatePostData(prev => ({
        ...prev,
        postImg: file
      }));
    } else {
      setUpdatePostData(prev => ({
        ...prev,
        [id]: value.trim()
      }));
    }
  };

  const handleOnSubmitUpdatePostData = async (e) => {
    e.preventDefault();

    if (!updatePostData.postContent || updatePostData.postContent.trim() === "") {
      setPostErrMsg("Write Something About Your Post!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("postTitle", updatePostData.postTitle);
      formData.append("postCategory", updatePostData.postCategory);
      formData.append("postContent", updatePostData.postContent);

      if (updatePostData.postImg instanceof File) {
        formData.append("postImg", updatePostData.postImg);
      } else if (updatePostData.postImg) {
        // ✅ Send the old image name so backend knows to keep it
        formData.append("postImg", updatePostData.postImg);
      }

      const res = await API.post(`/post/${userId}/${slug}/update-post`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      const updatedPost = res.data?.data;
      const message = res.data?.message;
      console.log(updatedPost, message);
    } catch (error) {
      console.log(error.response?.data?.message || "Error while updating post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <PageTitle title={`Update Post: ${updatePostData.postTitle}`} />
      <form onSubmit={handleOnSubmitUpdatePostData} className="w-sm md:w-lg lg:w-full space-y-2">
        <div className={`${!loading ? "" : "opacity-50"}`}>
          <h1 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            Update Post
          </h1>

          {/* Error Message */}
          {updatePostErrMsg && (
            <div className="alert alert-error self-center text-lg w-sm md:w-lg lg:w-fit mb-2">
              👀 {updatePostErrMsg}
            </div>
          )}

          {/* Title & Category */}
          <div className="flex flex-col md:flex-row space-y-1 md:space-x-2">
            <input
              onChange={handleOnChangeUpdatePostData}
              id="postTitle"
              required
              value={updatePostData.postTitle}
              type="text"
              placeholder={updatePostData.postTitle}
              className="input w-full border-2 rounded-lg"
            />
            <select
              onChange={handleOnChangeUpdatePostData}
              id="postCategory"
              required
              value={updatePostData.postCategory}
              className="select w-full md:w-fit rounded-lg border-2"
            >
              <option value="Uncategorized">Uncategorized</option>
              <option value="Mythology">Mythology</option>
              <option value="sports">Sports</option>
              <option value="reactjs">React JS</option>
              <option value="web-evelopment">Web Development</option>
              <option value="marvel">Marvel</option>
            </select>
          </div>

          {/* Post Image */}
          {previewUpdatePostImg && (
            <img
              src={previewUpdatePostImg}
              alt="Post Preview"
              className="rounded-lg my-1 self-center"
            />
          )}
          <input
            onChange={handleOnChangeUpdatePostData}
            accept="image/*"
            id="postImg"
            type="file"
            className="file-input file-input-lg mt-1 min-w-full border-2 rounded-lg"
          />

          {/* Text Editor */}
          <TextEditor
            onChange={editorContent => handleOnChangeUpdatePostData(null, editorContent)}
            value={updatePostData.postContent}
            className="my-2"
          />
        </div>

        {loading && (
          <p className="text-center font-bold text-2xl md:text-5xl animate-pulse">
            Updating Your Post...
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          text={loading ? <Loader /> : "Update"}
          style="imp"
        />
      </form>
    </Container>
  );
};

export default UpdatePost;
