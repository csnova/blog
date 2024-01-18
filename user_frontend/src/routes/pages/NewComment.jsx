import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useNewComment from "../postRequests/postNewComment";
import getPostDetails from "../getRequests/getPostDetails";

const NewComment = ({ userToken, currentUser, postViewed }) => {
  const [currentText, setCurrentText] = useState("");
  const { postDetails, error, loading } = getPostDetails(postViewed);
  const { attemptNewComment } = useNewComment();
  function newCommentSubmit(e) {
    attemptNewComment(postViewed, currentText, currentUser._id, userToken);
  }

  function handleTextChange(e) {
    setCurrentText(e.target.value);
  }

  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="pageTitle">New Comment</h1>

      {currentUser ? (
        <div className="page">
          <div className="postDetails">
            <br />
            <div className="postDetailTitleBox">
              <h2>Title:</h2>
              <h2 className="postDetailTitle">{postDetails.post.title}</h2>
            </div>
            <div className="postDetailTextBox">
              <h2>Post:</h2>
              <h2 className="postDetailText">{postDetails.post.text}</h2>
            </div>
            <br />
          </div>
          <div className="newPostFormBox">
            <form className="newPostForm">
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
            </form>
            <label>
              <button className="formSubmit" onClick={newCommentSubmit}>
                Submit
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <p>Must be Signed In to view this page</p>
          <div className="signInUp">
            <Link to="/blog/sign-in" className="signInButton">
              Sign In
            </Link>
            <Link to="/blog/sign-up" className="signInButton">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewComment;
