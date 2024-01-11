import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import viewIcon from "../assets/show.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/trash.png";

const Posts = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">Manage Posts</h1>

      {isSignedIn ? (
        <div>
          {/* Add an Option for No Posts */}
          <table className="postsTable">
            {/* Real Info Made Recursively From Array */}
            <tr>
              <th>Title</th>
              <th>Date Published</th>
              <th>Modified Date</th>
              <th>Comments</th>
              <th>View</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            <tr>
              <td>Fist Post!</td>
              <td>Some Dat from Database</td>
              <td>Not Updated</td>
              <td>Number from Database</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={deleteIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Fist Post!</td>
              <td>Some Dat from Database</td>
              <td>Not Updated</td>
              <td>Number from Database</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={deleteIcon} alt="" className="tableIcon" />
                </Link>
              </td>
            </tr>
            <tr>
              <td>Fist Post!</td>
              <td>Some Dat from Database</td>
              <td>Not Updated</td>
              <td>Number from Database</td>
              <td>
                <Link to="/users">
                  <img src={viewIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={editIcon} alt="" className="tableIcon" />
                </Link>
              </td>
              <td>
                <Link to="/users">
                  <img src={deleteIcon} alt="" className="tableIcon" />
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

export default Posts;
