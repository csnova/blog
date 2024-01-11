import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Users = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">Users</h1>

      {isSignedIn ? (
        <div> </div>
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
