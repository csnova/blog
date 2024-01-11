import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import editIcon from "../assets/edit.png";

const Profile = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">Profile</h1>

      {isSignedIn ? (
        <div>
          <h2 className="tableHeader">Username</h2>
          <table className="profileTable">
            {/* Real Info Made From Database */}
            <tr>
              <th>Category</th>
              <th>Value</th>
              <th>Update</th>
            </tr>
            <tr>
              <th>Name</th>
              <td>Chandler</td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <th>Username</th>
              <td>csnova</td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>csnova@gmail.com</td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>--------</td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
          </table>
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

export default Profile;
