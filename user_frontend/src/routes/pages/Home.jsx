import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import Summary from "./Summary";
import PostDetails from "./PostDetails";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";
import Profile from "./Profile";
import UpdateProfile from "./ProfileUpdate";
import NewComment from "./NewComment";

function Home() {
  const [postViewed, setPostViewed] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const { page } = useParams();

  function checkStorage() {
    if (!localStorage.getItem("userToken")) {
      localStorage.setItem("userToken", null);
      localStorage.setItem("userDetails", null);
    } else {
      setUserToken(localStorage.getItem("userToken"));
      setCurrentUser(JSON.parse(localStorage.getItem("userDetails")));
    }
  }

  useEffect(() => {
    checkStorage();
  }, []);

  return (
    <>
      <div className="topBar">
        <div className="logoBar">
          <img src={logo} alt="" className="logo" />
          <p className="title">Blog User Site</p>
        </div>
        <div className="currentUserBox">
          {currentUser ? (
            <Link to="/blog/profile" className="currentUserButton">
              {currentUser.username}
            </Link>
          ) : (
            <>
              <Link to="/blog/sign-in" className="signInButton">
                Sign In
              </Link>
              <Link to="/blog/sign-up" className="signInButton">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="centerPage">
        <div className="sideBar">
          <Link to="/" className="linkBox">
            Home
          </Link>
          {currentUser ? (
            <Link to="/blog/sign-out" className="linkBox">
              Sign Out
            </Link>
          ) : (
            <>
              <Link to="/blog/sign-in" className="linkBox">
                Sign In
              </Link>
              <Link to="/blog/sign-up" className="linkBox">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="mainPage">
          <div className="pageSpecificInfo">
            {page === "post" ? (
              <PostDetails currentUser={currentUser} postViewed={postViewed} />
            ) : page === "newComment" ? (
              <NewComment
                userToken={userToken}
                currentUser={currentUser}
                postViewed={postViewed}
              />
            ) : page === "sign-in" ? (
              <SignIn
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "sign-out" ? (
              <SignOut
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "sign-up" ? (
              <SignUp
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "profile" ? (
              <Profile currentUser={currentUser} />
            ) : page === "updateProfile" ? (
              <UpdateProfile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userToken={userToken}
              />
            ) : (
              <Summary
                currentUser={currentUser}
                setPostViewed={setPostViewed}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
