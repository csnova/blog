import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PostSignIn from "../postRequests/postSignIn";

const SignIn = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div className="page">
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
        <div className="signInFormBox">
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
              <input className="formSubmit" type="submit" value="Submit" />
            </label>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;

// const YourComponent = () => {
//   const username = "csnova";
//   const password = "hellothere";

//   const { signIn, error, loading } = PostSignIn({ username, password });

//   // Rest of your component logic

//   return (
//     // Your JSX here
//   );
// };

// export default YourComponent;
