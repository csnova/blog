import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getCommentDetails from "../getRequests/getCommentDetails";
import useCommentDelete from "../postRequests/postDeleteComment";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

const CommentDelete = ({
  userToken,
  setUserToken,
  currentUser,
  setCurrentUser,
  postViewed,
  setPostViewed,
  commentViewed,
  setCommentViewed,
}) => {
  const { commentDetails, error, loading } = getCommentDetails(
    postViewed,
    commentViewed
  );
  const { deletedComment, attemptCommentDelete } = useCommentDelete();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  function deleteCommentSubmit(e) {
    attemptCommentDelete(postViewed, commentViewed, userToken, true);
  }

  return (
    <div className="page">
      <h1 className="pageTitle">Delete Comment</h1>
      {currentUser ? (
        <div className="postDetails">
          <div className="deleteMessage">
            <h2>Are you sure you want to delete this Comment?</h2>
            <button className="deleteButton" onClick={deleteCommentSubmit}>
              Delete
            </button>
          </div>
          <br />
          <div className="postDetailTitleBox">
            <h2>Post:</h2>
            <h2 className="postDetailTitle">{commentDetails.post.title}</h2>
          </div>
          <div className="commentDetailTextBox">
            <h2>Comment:</h2>
            <h2 className="commentDetailText">{commentDetails.comment.text}</h2>
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

export default CommentDelete;
