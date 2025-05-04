import React, { useEffect, useState } from 'react';
import { Button, Loader, PageTitle, TextEditor } from '../../../Components/CompsIndex.js';
import { API } from '../../../API/API.js';
import { useNavigate } from 'react-router-dom';


const ShareWORDS = () => {
  const [postFormData, setPostFormData] = useState({
    postTitle: "",
    postCategory: "uncategorized",
    postImg: null,
    postContent: ""
  })
  const [previewPostImg, setPreviewPostImg] = useState(null)
  const [postErrMsg, setPostErrMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const validImgTypes = ["image/jpeg", "image/png", "image/jpg"]
  const maxSize = 1 * 1024 * 1024 //1mb
  const minSize = 500 * 1024  //500kb

  const handleOnChangePostData = (e, editorContent = null) => {

    if (editorContent !== null) {
      setPostFormData((prev) => ({
        ...prev,
        postContent: editorContent
      }))
      return
    }

    const { id, type, value, files } = e.target

    if (type === "file") {
      const file = files[0]

      if (!validImgTypes.includes(file.type)) {
        alert("Invalid file type! Please upload JPEG, JPG, or PNG.");
        e.target.value = null
        return
      }

      // if (file.size < minSize || file.size > maxSize) {
      //   alert("Post Image size must be between 500KB and 2MB.");
      //   e.target.value = null
      //   return
      // }

      //postImg setup
      setPreviewPostImg(URL.createObjectURL(file))
      setPostFormData((prev) => ({
        ...prev,
        postImg: file
      }))

    } else {
      //all other id datas
      setPostFormData((prev) => ({
        ...prev,
        [id]: value.trim()
      }));
    }
  }

  const handleOnSubmitPostData = async (e) => {
    e.preventDefault();

    if (!postFormData.postContent || postFormData.postContent.trim() === "") {
      setPostErrMsg("Write Something About Your Post!");
      return
    }

    try {
      setLoading(true)

      const formData = new FormData();
      formData.append("postTitle", postFormData.postTitle);
      formData.append("postCategory", postFormData.postCategory);
      formData.append("postImg", postFormData.postImg);
      formData.append("postContent", postFormData.postContent);

      const res = await API.post('/post/create-newpost', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });


      setLoading(false)

      const successMsg = res.data.message
      const slug = res.data.data.newPost.slug

      navigate(`/post/${slug}`)

      setTimeout(() => {
        alert(successMsg)
      }, 500);

    } catch (error) {
      setLoading(false)
      setPostErrMsg(error.response?.data?.message || "Something Went Wrong While Creating New Post! Kindly Try Again!");
      // console.log(postErrMsg)
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setPostErrMsg(null)
    }, 5000);
  }, [postErrMsg])


  return (
    <>
      <PageTitle title="ShareWORDS" />
      <form
        onSubmit={handleOnSubmitPostData}
        className='w-sm md:w-lg lg:w-7xl space-y-2'>

        <div className={`${!loading ? "" : "opacity-50"}`}>

          <h1 className='text-center text-2xl md:text-3xl font-semibold mb-8'>ShareWORDS</h1>

          {/* error msg */}
          {postErrMsg && (
            <div className='alert alert-error self-center justify-self-center text-lg w-sm md:w-lg lg:w-fit mb-2'>{`👀 ${postErrMsg}`}</div>
          )}

          {/* Title and Category */}
          <div className='flex flex-col md:flex-row space-y-1 md:space-x-2'>
            <input
              onChange={handleOnChangePostData}
              id='postTitle'
              required
              type="text"
              placeholder="YourWORDS Title"
              className="input w-full border-2 rounded-lg"
            />

            <select
              onChange={handleOnChangePostData}
              id='postCategory'
              required
              className='select w-full md:w-fit rounded-lg border-2'
            >
              <option>Uncategorized</option>
              <option value="Mythology">Mythology</option>
              <option value="sports">Sports</option>
              <option value="reactjs">React JS</option>
              <option value="web-evelopment">Web Development</option>
              <option value="marvel">Marvel</option>
            </select>
          </div>

          {/* Post Image */}
          {previewPostImg && (
            <img
              src={previewPostImg}
              className='rounded-lg my-1 self-center justify-self-center'
            />
          )}

          < input
            required
            onChange={handleOnChangePostData}
            accept='image/*'
            id='postImg'
            type="file"
            className='file-input file-input-lg mt-1  min-w-full border-2 rounded-lg'
          />

          {/* textEditor */}
          <TextEditor
            onChange={(editorContent) => handleOnChangePostData(null, editorContent)}
            className='mt-2 mb-4'
          />

        </div>
        {loading && (
          <p className='text-center font-bold text-2xl md:text-5xl animate-pulse'>Creating Your Post...</p>
        )}
        {/* Submit Button */}
        <Button
          type="submit"
          text={loading ? <Loader /> : "Publish"}
          style='imp'
        />
      </form>
    </>
  );
};

export default ShareWORDS;
