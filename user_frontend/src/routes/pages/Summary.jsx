import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPosts from "../getRequests/getPosts";
import viewIcon from "../../assets/show.png";
import Moment from "moment";

const Summary = ({ currentUser, setPostViewed }) => {
  const { postInfo, error, loading } = getPosts();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      {currentUser ? (
        <div className="page">
          <h2 className="tableHeader">Welcome to Chandler's Kitchen</h2>
          <h3 className="tableHeader">A Site Devoted to Sugar Free Cooking!</h3>
          <div className="tableBox">
            <table className="postsTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {postInfo.post_list.map((post, index) => {
                  if (!post.published) {
                    return;
                  } else {
                    let timestamp = post.timestamp;
                    timestamp = Moment(timestamp).format("MM/DD/YY");

                    const postButtonClass = `postButton${index}`;

                    function onPostClick(e) {
                      let postID = e.target.className;
                      postID = postID.slice(10);
                      postID = postInfo.post_list[postID]._id;
                      setPostViewed(postID);
                    }

                    return (
                      <tr key={post.title}>
                        <td>{post.title}</td>
                        <td>{timestamp}</td>
                        <td>
                          <button onClick={onPostClick}>
                            <Link to="/post">
                              <img
                                src={viewIcon}
                                alt="link to view post details"
                                id="tableIcon"
                                className={postButtonClass}
                              />
                            </Link>
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="signInMessage">
          <h1 className="pageTitle">Home</h1>
          <p>Must be Signed In to view this page</p>
          <Link to="/sign-in" className="signInButton">
            Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Summary;
