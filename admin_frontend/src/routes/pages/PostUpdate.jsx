import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import useUpdatePost from "../postRequests/postUpdatePost";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/trash.png";
import Moment from "moment";

const PostUpdate = ({
  userToken,
  setUserToken,
  currentUser,
  setCurrentUser,
  postViewed,
  setPostViewed,
}) => {
  const { postDetails, error, loading } = getPostDetails(postViewed);
  const { attemptUpdatePost } = useUpdatePost();
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [currentPublished, setCurrentPublished] = useState("");

  useEffect(() => {
    // Set the current title when postDetails change
    if (postDetails && postDetails.post) {
      if (postDetails.post.title) setCurrentTitle(postDetails.post.title);
      if (postDetails.post.text) setCurrentText(postDetails.post.text);
      if (postDetails.post.published) {
        setCurrentPublished(postDetails.post.published);
      }
    }
  }, [postDetails]);

  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  function updatePostSubmit(e) {
    attemptUpdatePost(
      currentTitle,
      currentText,
      currentPublished,
      userToken,
      postViewed,
      setPostViewed
    );
  }

  function handleTitleChange(e) {
    setCurrentTitle(e.target.value);
  }

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  function handlePublishedChange(e) {
    setCurrentPublished(e.target.value);
  }
  return (
    <div className="page">
      <h1 className="pageTitle">Update Post</h1>
      {currentUser ? (
        <div className="page">
          <div className="newPostFormBox">
            <form className="newPostForm">
              <label className="formTitle">
                Title:
                <input
                  className="formTitleInput"
                  type="text"
                  onChange={handleTitleChange}
                  value={currentTitle}
                />
              </label>
              <label className="formText">
                Text:
                <textarea
                  className="formTextInput"
                  name="text"
                  id="text"
                  cols="60"
                  rows="20"
                  onChange={handleTextChange}
                  value={currentText}
                ></textarea>
              </label>
              <label
                className="formRadio"
                required
                onChange={handlePublishedChange}
              >
                Status:
                <div className="radioButton">
                  <input
                    type="radio"
                    id="published"
                    name="published"
                    value="true"
                  />
                  <label htmlFor="published">Published</label>
                </div>
                <div className="radioButton">
                  <input
                    type="radio"
                    id="unpublished"
                    name="published"
                    value="false"
                  />
                  <label htmlFor="unpublished">Unpublished</label>
                </div>
              </label>
            </form>
            <label>
              <button className="formSubmit" onClick={updatePostSubmit}>
                Submit
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <p>Must be Signed In to view this page</p>
          <Link to="/sign-in" className="signInButton">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostUpdate;
