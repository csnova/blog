import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useNewPost from "../postRequests/postNewPost";

const NewPost = ({ userToken, setUserToken, currentUser, setCurrentUser }) => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [currentText, setCurrentText] = useState("");
  const [currentPublished, setCurrentPublished] = useState("");
  const { newPost, error, loading, attemptNewPost } = useNewPost();
  function newPostSubmit(e) {
    attemptNewPost(currentTitle, currentText, currentPublished, userToken);
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
    <div>
      <h1 className="pageTitle">New Post</h1>

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
              <button className="formSubmit" onClick={newPostSubmit}>
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

export default NewPost;
