import { Link, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

const NewPost = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <h1 className="pageTitle">New Post</h1>

      {isSignedIn ? (
        <div className="page">
          <div className="newPostFormBox">
            <form className="newPostForm">
              <label className="formTitle">
                Title:
                <input className="formTitleInput" type="text" />
              </label>
              <label className="formText">
                Text:
                <textarea
                  className="formTextInput"
                  name="text"
                  id="text"
                  cols="60"
                  rows="20"
                ></textarea>
              </label>
              <label className="formRadio">
                Status:
                <div className="radioButton">
                  <input
                    type="radio"
                    id="published"
                    name="published"
                    value="true"
                  />
                  <label htmlFor="published">Published</label>
                </div>
                <div className="radioButton">
                  <input
                    type="radio"
                    id="unpublished"
                    name="published"
                    value="false"
                  />
                  <label htmlFor="unpublished">Unpublished</label>
                </div>
              </label>
              <label>
                <input className="formSubmit" type="submit" value="Submit" />
              </label>
            </form>
          </div>
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

export default NewPost;
