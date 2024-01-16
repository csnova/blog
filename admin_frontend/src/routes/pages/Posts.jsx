import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getPosts from "../getRequests/getPosts";
import viewIcon from "../../assets/show.png";
import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/trash.png";
import Moment from "moment";

const Posts = ({ currentUser, setCurrentUser, postViewed, setPostViewed }) => {
  const { postInfo, error, loading } = getPosts();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Manage Posts</h1>

      {currentUser ? (
        <div>
          <div className="tableBox">
            <table className="postsTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>View</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {postInfo.post_list.map((post, index) => {
                  let timestamp = post.timestamp;
                  timestamp = Moment(timestamp).format("DD/MM/YY");

                  let isPublished = "Unpublished";
                  if (post.published) isPublished = "Published";

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
                      <td>{isPublished}</td>
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
                      <td>
                        <Link to="/users">
                          <img src={editIcon} alt="" id="tableIcon" />
                        </Link>
                      </td>
                      <td>
                        <button onClick={onPostClick}>
                          <Link to="/deletePost">
                            <img
                              src={deleteIcon}
                              alt="link to delete post"
                              id="tableIcon"
                              className={postButtonClass}
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

export default Posts;
