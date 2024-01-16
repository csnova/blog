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
import PostDelete from "./PostDelete";
import CommentDelete from "./CommentDelete";

function Home() {
  const [postViewed, setPostViewed] = useState(null);
  const [userViewed, setUserViewed] = useState(null);
  const [commentViewed, setCommentViewed] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const { page } = useParams();

  function checkStorage() {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", null);
      localStorage.setItem("user", null);
    } else {
      setUserToken(localStorage.getItem("token"));
      setCurrentUser(JSON.parse(localStorage.getItem("user")));
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
          <p className="title">Blog Admin Site</p>
        </div>
        <div className="currentUserBox">
          {currentUser ? (
            <Link to="/profile" className="currentUserButton">
              {currentUser.username}
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
          {currentUser ? (
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
              <NewPost
                userToken={userToken}
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "deletePost" ? (
              <PostDelete
                userToken={userToken}
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                postViewed={postViewed}
                setPostViewed={setPostViewed}
              />
            ) : page === "deleteComment" ? (
              <CommentDelete
                userToken={userToken}
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                postViewed={postViewed}
                setPostViewed={setPostViewed}
                commentViewed={commentViewed}
                setCommentViewed={setCommentViewed}
              />
            ) : page === "posts" ? (
              <Posts
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                postViewed={postViewed}
                setPostViewed={setPostViewed}
              />
            ) : page === "users" ? (
              <Users
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
              />
            ) : page === "sign-in" ? (
              <SignIn
                userToken={userToken}
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "sign-out" ? (
              <SignOut
                userToken={userToken}
                setUserToken={setUserToken}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            ) : page === "profile" ? (
              <Profile currentUser={currentUser} />
            ) : page === "post" ? (
              <PostDetails
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
                postViewed={postViewed}
                setPostViewed={setPostViewed}
                commentViewed={commentViewed}
                setCommentViewed={setCommentViewed}
              />
            ) : page === "user" ? (
              <UserDetails
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userViewed={userViewed}
                setUserViewed={setUserViewed}
                postViewed={postViewed}
                setPostViewed={setPostViewed}
                commentViewed={commentViewed}
                setCommentViewed={setCommentViewed}
              />
            ) : (
              <Summary
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                userToken={userToken}
                setUserToken={setUserToken}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
