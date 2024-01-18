import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/edit.png";

const Profile = ({ currentUser }) => {
  let userStatus = "User";
  if (currentUser.admin) userStatus = "Admin";
  return (
    <div className="page">
      <h1 className="pageTitle">Profile</h1>

      {currentUser ? (
        <div>
          <h2 className="tableHeader">{currentUser.username}</h2>
          <Link className="editButtonBox" to="/blog/updateProfile">
            <img
              src={editIcon}
              alt="link to update profile"
              className="tableIcon"
            />
          </Link>
          <br />
          <div className="tableBox">
            <table className="profileTable">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{currentUser.name}</td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>{currentUser.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{currentUser.email}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{userStatus}</td>
                </tr>
              </tbody>
            </table>
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

export default Profile;
