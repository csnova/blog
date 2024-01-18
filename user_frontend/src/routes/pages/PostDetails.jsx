import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import Moment from "moment";
import addIcon from "../../assets/add.png";

const PostDetails = ({ currentUser, postViewed }) => {
  const { postDetails, error, loading } = getPostDetails(postViewed);
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1 className="pageTitle">Post Details</h1>
      {currentUser ? (
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
          <div className="postDetailCommentBox">
            <div className="headerBox">
              <Link className="addButtonBox" to="/blog/newComment">
                <img
                  src={addIcon}
                  alt="link to update profile"
                  className="addIcon"
                />
              </Link>
              <h2 className="tableHeader">Comments:</h2>
            </div>
            <div className="tableBox">
              <table className="commentsTable">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Created</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {postDetails.comments.map((comment, index) => {
                    let timestamp = comment.timestamp;
                    timestamp = Moment(timestamp).format("MM/DD/YY");
                    return (
                      <tr key={comment._id}>
                        <td>{comment.user.username}</td>
                        <td>{timestamp}</td>
                        <td>{comment.text}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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

export default PostDetails;
