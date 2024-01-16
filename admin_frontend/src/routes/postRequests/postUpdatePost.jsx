import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useUpdatePost = () => {
  const [updatedPost, setUpdatedPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptUpdatePost = useCallback(
    (title, text, published, token, postID, setPostViewed) => {
      return fetch(`http://localhost:3000/blogAPI/post/${postID}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, text, published, token }),
      })
        .then(async (response) => {
          try {
            let data = await response.json();
            setUpdatedPost(data);
            setPostViewed(postID);
            navigate("/post");
          } catch (error) {
            setError(error);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { updatedPost, error, loading, attemptUpdatePost };
};

export default useUpdatePost;
