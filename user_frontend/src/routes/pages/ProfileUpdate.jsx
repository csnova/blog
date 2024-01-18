import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useUpdateProfile from "../postRequests/postUpdateProfile";
import editIcon from "../../assets/edit.png";

const UpdateProfile = ({ currentUser, setCurrentUser, userToken }) => {
  const [currentName, setCurrentName] = useState(currentUser.name);
  const [currentUsername, setCurrentUsername] = useState(currentUser.username);
  const [currentEmail, setCurrentEmail] = useState(currentUser.email);
  const { attemptUpdateProfile } = useUpdateProfile();

  function updateProfileSubmit(e) {
    attemptUpdateProfile(
      currentName,
      currentUsername,
      currentEmail,
      currentUser._id,
      userToken,
      setCurrentUser
    );
  }

  function handleNameChange(e) {
    setCurrentName(e.target.value);
  }

  function handleUsernameChange(e) {
    setCurrentUsername(e.target.value);
  }

  function handleEmailChange(e) {
    setCurrentEmail(e.target.value);
  }
  return (
    <div className="page">
      <h1 className="pageTitle">Update Profile</h1>

      {currentUser ? (
        <div>
          <h2 className="tableHeader">{currentUser.username}</h2>
          <Link className="editButtonBox" to="/blog/users">
            <img src={editIcon} alt="" className="tableIcon" />
          </Link>
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
                  <td>
                    <input
                      className="formNameInput"
                      type="text"
                      onChange={handleNameChange}
                      value={currentName}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>
                    <input
                      className="formUsernameInput"
                      type="text"
                      onChange={handleUsernameChange}
                      value={currentUsername}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <input
                      className="formEmailInput"
                      type="text"
                      onChange={handleEmailChange}
                      value={currentEmail}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <label>
              <button className="formSubmit" onClick={updateProfileSubmit}>
                Submit
              </button>
            </label>
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

export default UpdateProfile;
