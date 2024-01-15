import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import usePostSignOut from "../postRequests/postSignOut";
import { useNavigate } from "react-router-dom";

const SignOut = ({ userToken, setUserToken, currentUser, setCurrentUser }) => {
  const { loading, attemptLogout, signOut, error } = usePostSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    if (signOut) {
      localStorage.setItem("token", null);
      setUserToken(null);
      localStorage.setItem("user", null);
      setCurrentUser(null);
      navigate("/sign-in");
    }
  }, [signOut]);
  return (
    <div className="page">
      <h1 className="pageTitle">Sign-Out</h1>
      {currentUser ? (
        <div className="signOutMessage">
          <p>Are you sure you want to sign-out?</p>
          <button className="signOutButton" onClick={attemptLogout}>
            Sign Out
          </button>
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
