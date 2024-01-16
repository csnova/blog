import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import Summary from "./Summary";
import PostDetails from "./PostDetails";

function Home() {
  const [postViewed, setPostViewed] = useState(null);
  const [userViewed, setUserViewed] = useState(null);
  const [commentViewed, setCommentViewed] = useState(null);
  const [currentUser, setCurrentUser] = useState("me");
  const [userToken, setUserToken] = useState(null);
  const { page } = useParams();

  function checkStorage() {
    if (!localStorage.getItem("userToken")) {
      localStorage.setItem("userToken", null);
      localStorage.setItem("userDetails", JSON.stringify("me"));
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
            <Link to="/profile" className="currentUserButton">
              {/* {currentUser.username} */}
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
            {page === "post" ? (
              <PostDetails currentUser={currentUser} postViewed={postViewed} />
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
