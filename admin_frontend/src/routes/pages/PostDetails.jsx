import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPostDetails from "../getRequests/getPostDetails";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/trash.png";
import Moment from "moment";

const PostDetails = ({
  currentUser,
  setCurrentUser,
  userViewed,
  setUserViewed,
  postViewed,
  setPostViewed,
  commentViewed,
  setCommentViewed,
}) => {
  const { postDetails, error, loading } = getPostDetails(postViewed);
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="page">
      <h1 className="pageTitle">Post Details</h1>
      {currentUser ? (
        <div className="postDetails">
          <div className="postDetailTopBar">
            <div className="postDetailButtons">
              <Link to="/updatePost">
                <img
                  src={editIcon}
                  alt="link to update post"
                  className="tableIcon"
                />
              </Link>
              <Link to="/deletePost">
                <img
                  src={deleteIcon}
                  alt="link to delete post"
                  id="tableIcon"
                />
              </Link>
            </div>
          </div>
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
            <h2 className="tableHeader">Comments:</h2>
            <div className="tableBox">
              <table className="commentsTable">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Created</th>
                    <th>Comment</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {postDetails.comments.map((comment, index) => {
                    let timestamp = comment.timestamp;
                    timestamp = Moment(timestamp).format("DD/MM/YY");

                    const commentAndPostID = `${postViewed} ${comment._id}`;

                    function onUserClick(e) {
                      let userID = e.target.className;
                      setUserViewed(userID);
                    }

                    function onCommentClick(e) {
                      let postID = e.target.classList[0];
                      setPostViewed(postID);
                      let commentID = e.target.classList[1];
                      setCommentViewed(commentID);
                    }
                    return (
                      <tr key={comment._id}>
                        <td>
                          <button onClick={onUserClick}>
                            <Link to="/user" className={comment.user._id}>
                              {comment.user.username}
                            </Link>
                          </button>
                        </td>
                        <td>{timestamp}</td>
                        <td>{comment.text}</td>
                        <td>
                          <button onClick={onCommentClick}>
                            <Link to="/deleteComment">
                              <img
                                src={deleteIcon}
                                alt=""
                                id="tableIcon"
                                className={commentAndPostID}
                              />
                            </Link>
                          </button>
                        </td>
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
          <Link to="/sign-in" className="signInButton">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
