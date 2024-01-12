import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getUserDetails from "../getRequests/getUserDetails";
import Moment from "moment";
import viewIcon from "../../assets/show.png";
import deleteIcon from "../../assets/trash.png";

const UserDetails = ({
  isSignedIn,
  setIsSignedIn,
  userViewed,
  setUserViewed,
  currentPost,
  setCurrentPost,
}) => {
  const { userDetails, error, loading } = getUserDetails(userViewed);
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  let isAdmin = "User";
  if (userDetails.specificUser.admin) isAdmin = "Admin";
  return (
    <div className="page">
      <h1 className="pageTitle">User Details</h1>
      {isSignedIn ? (
        <div className="userDetails">
          <div className="userDetailsBox">
            <h3>Name:</h3>
            <h3 className="userDetailInfo">{userDetails.specificUser.name}</h3>
          </div>
          <div className="userDetailsBox">
            <h3>Username:</h3>
            <h3 className="userDetailInfo">
              {userDetails.specificUser.username}
            </h3>
          </div>
          <div className="userDetailsBox">
            <h3>Email:</h3>
            <h3 className="userDetailInfo">{userDetails.specificUser.email}</h3>
          </div>
          <div className="userDetailsBox">
            <h3>Status:</h3>
            <h3 className="userDetailInfo">{isAdmin}</h3>
          </div>
          <br />
          <div className="userCommentBox">
            <h2 className="tableHeader">Comments:</h2>
            <div className="tableBox">
              <table className="commentsTable">
                <thead>
                  <tr>
                    <th>Post</th>
                    <th>Created</th>
                    <th>Comment</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.comments.map((comment, index) => {
                    let timestamp = comment.timestamp;
                    timestamp = Moment(timestamp).format("DD/MM/YY");

                    function onPostClick(e) {
                      let postID = e.target.className;
                      setCurrentPost(postID);
                    }
                    return (
                      <tr key={comment._id}>
                        <td>
                          <button onClick={onPostClick}>
                            <Link to="/post">
                              <img
                                src={viewIcon}
                                alt=""
                                id="tableIcon"
                                className={comment.blogPost}
                              />
                            </Link>
                          </button>
                        </td>
                        <td>{timestamp}</td>
                        <td>{comment.text}</td>
                        <td>
                          <Link to="/users">
                            <img
                              src={deleteIcon}
                              alt=""
                              className="tableIcon"
                            />
                          </Link>
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

export default UserDetails;
