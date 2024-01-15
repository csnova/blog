import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getUsers from "../getRequests/getUsers";
import viewIcon from "../../assets/show.png";

const Users = ({ currentUser, setCurrentUser, userViewed, setUserViewed }) => {
  const { userInfo, error, loading } = getUsers();
  if (error) return <p>A Network Error has occurred. </p>;
  if (loading) return <p>Loading...</p>;
  return (
    <div className="page">
      <h1 className="pageTitle">Manage Users</h1>

      {currentUser ? (
        <div>
          <div className="tableBox">
            <table className="usersTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.map((user, index) => {
                  let isAdmin = "User";
                  if (user.admin) isAdmin = "Admin";

                  const userButtonClass = `userButton${index}`;

                  function onUserClick(e) {
                    let userID = e.target.className;
                    userID = userID.slice(10);
                    userID = userInfo[userID]._id;
                    setUserViewed(userID);
                  }
                  return (
                    <tr key={user.username}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{isAdmin}</td>
                      <td>
                        <button onClick={onUserClick}>
                          <Link to="/user">
                            <img
                              src={viewIcon}
                              alt=""
                              id="tableIcon"
                              className={userButtonClass}
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
export default Users;
