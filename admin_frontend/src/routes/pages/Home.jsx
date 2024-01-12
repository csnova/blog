import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import Summary from "./Summary";
import NewPost from "./NewPost";
import Posts from "./Posts";
import Users from "./Users";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Profile from "./Profile";
import PostDetails from "./PostDetails";
import UserDetails from "./UserDetails";

function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [userViewed, setUserViewed] = useState(null);
  const { page } = useParams();
  return (
    <>
      <div className="topBar">
        <div className="logoBar">
          <img src={logo} alt="" className="logo" />
          <p className="title">Blog Admin Site</p>
        </div>
        <div className="currentUserBox">
          {isSignedIn ? (
            <Link to="/profile" className="currentUserButton">
              username
            </Link>
          ) : (
            <Link to="/sign-in" className="signInButton">
              Sign In
            </Link>
          )}
        </div>
      </div>

      <div className="centerPage">
        <div className="sideBar">
          <Link to="/" className="linkBox">
            Home
          </Link>
          <Link to="/newPost" className="linkBox">
            New Post
          </Link>
          <Link to="/posts" className="linkBox">
            Manage Posts
          </Link>
          <Link to="/users" className="linkBox">
            Manage Users
          </Link>
          {isSignedIn ? (
            <Link to="/sign-out" className="linkBox">
              Sign Out
            </Link>
          ) : (
            <Link to="/sign-in" className="linkBox">
              Sign In
            </Link>
          )}
        </div>

        <div className="mainPage">
          <div className="pageSpecificInfo">
            {page === "newPost" ? (
              <NewPost isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            ) : page === "posts" ? (
              <Posts
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
              />
            ) : page === "users" ? (
              <Users
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
              />
            ) : page === "sign-in" ? (
              <SignIn isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            ) : page === "sign-out" ? (
              <SignOut isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            ) : page === "profile" ? (
              <Profile isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            ) : page === "post" ? (
              <PostDetails
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
              />
            ) : page === "user" ? (
              <UserDetails
                isSignedIn={isSignedIn}
                setIsSignedIn={setIsSignedIn}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
                currentPost={currentPost}
                setCurrentPost={setCurrentPost}
              />
            ) : (
              <Summary isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
