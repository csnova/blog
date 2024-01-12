import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const SignOut = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div className="page">
      <h1 className="pageTitle">Sign-Out</h1>
      {isSignedIn ? (
        <div className="signOutMessage">
          <p>Are you sure you want to sign-out?</p>
          <button className="signOutButton">Sign Out</button>
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

export default SignOut;
