import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import viewIcon from "../assets/show.png";

const Summary = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      {isSignedIn ? (
        <div>
          <h2 className="tableHeader">Welcome Back to You Blog Page!</h2>
          <h3 className="tableHeader">Here are some stats!</h3>
          <table className="statsTable">
            <tr>
              <th>Type</th>
              <th>Quantity</th>
              <th>View</th>
            </tr>
            <tr>
              <td>Posts</td>
              <td>Value From Database</td>
              <td>
                <Link to="/posts">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Users</td>
              <td>Value From Database</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Comments</td>
              <td>Value From Database</td>
              <td></td>
            </tr>
          </table>
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
