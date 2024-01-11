import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import viewIcon from "../assets/show.png";

const Users = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">Manage Users</h1>

      {isSignedIn ? (
        <div>
          {/* Add an Option for No Posts */}
          <table className="usersTable">
            {/* Real Info Made Recursively From Array */}
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Comments</th>
              <th>View</th>
            </tr>
            <tr>
              <td>Chandler</td>
              <td>csnova</td>
              <td>csnova@gmail.com</td>
              <td>Admin</td>
              <td>1</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Flannery</td>
              <td>sillyflan</td>
              <td>sillyflan@gmail.com</td>
              <td>User</td>
              <td>1</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Kyle</td>
              <td>kmno</td>
              <td>knmo@gmail.com</td>
              <td>User</td>
              <td>1</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
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
export default Users;
