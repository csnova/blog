import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const SignIn = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">Sign-In</h1>

      {isSignedIn ? (
        <div className="alreadySignedIn">
          <p>You are already Signed in!</p>
          <div className="buttonBox">
            <Link to="/sign-out" className="signOutButton">
              Sign Out
            </Link>
            <Link to="/profile" className="profileButton">
              Profile
            </Link>
          </div>
        </div>
      ) : (
        <div className="signIn">
          <form className="signInForm" onSubmit="">
            <label>
              Username:
              <input type="text" />
            </label>
            <label>
              Password:
              <input type="password" />
            </label>
            <label>
              <input className="signInSubmit" type="submit" value="Submit" />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
