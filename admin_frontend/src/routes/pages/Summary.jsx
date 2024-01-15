import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getStats from "../getRequests/getStats";
import viewIcon from "../../assets/show.png";

const Summary = ({ userToken, setUserToken, currentUser, setCurrentUser }) => {
  const { statsInfo, error, loading } = getStats();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      {currentUser ? (
        <div className="page">
          <h2 className="tableHeader">Welcome Back to You Blog Page!</h2>
          <h3 className="tableHeader">Here are some stats!</h3>
          <div className="tableBox">
            <table className="statsTable">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Posts</td>
                  <td>{statsInfo.post_count}</td>
                  <td>
                    <Link to="/posts">
                      <img src={viewIcon} alt="" className="tableIcon" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Users</td>
                  <td>{statsInfo.user_count}</td>
                  <td>
                    <Link to="/users">
                      <img src={viewIcon} alt="" className="tableIcon" />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Comments</td>
                  <td>{statsInfo.comment_count}</td>
                  <td></td>
                </tr>
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
