import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import editIcon from "../../assets/edit.png";

const Profile = ({ currentUser }) => {
  return (
    <div className="page">
      <h1 className="pageTitle">Profile</h1>

      {currentUser ? (
        <div>
          <h2 className="tableHeader">{currentUser.username}</h2>
          <Link className="editButtonBox" to="/updateProfile">
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

export default Profile;
