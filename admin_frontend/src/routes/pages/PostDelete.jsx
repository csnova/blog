import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import usePostDelete from "../postRequests/postDeletePost";
import useCommentDelete from "../postRequests/postDeleteComment";
import Moment from "moment";
import { useNavigate } from "react-router-dom";

const PostDelete = ({
  userToken,
  setUserToken,
  currentUser,
  setCurrentUser,
  postViewed,
  setPostViewed,
}) => {
  const navigate = useNavigate();
  if (!postViewed) navigate("/posts");
  const { postDetails, error, loading } = getPostDetails(postViewed);
  const { deletedPost, attemptPostDelete } = usePostDelete(postViewed);
  const { attemptCommentDelete } = useCommentDelete();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  function deletePostSubmit(e) {
    for (let i = 0; i < commentArray.length; i++) {
      const commentID = commentArray[i]._id;
      attemptCommentDelete(postViewed, commentID, userToken, false);
    }
    attemptPostDelete(postViewed, userToken, setPostViewed);
  }

  const commentArray = postDetails.comments;
  const commentNum = commentArray.length;
  return (
    <div className="page">
      <h1 className="pageTitle">Delete Post</h1>
      {currentUser ? (
        <div className="postDetails">
          <div className="deleteMessage">
            <h2>
              Are you sure you want to delete this post and all its Comments?
            </h2>
            <button className="deleteButton" onClick={deletePostSubmit}>
              Delete
            </button>
          </div>
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
          <div className="postDeleteCommentBox">
            <h2>Comments for this post will also be Deleted</h2>
            <div className="commentNum">
              <h3>Number of Comments: </h3>
              <h3>{commentNum}</h3>
            </div>
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

export default PostDelete;
