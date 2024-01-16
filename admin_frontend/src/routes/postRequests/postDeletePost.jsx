import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const usePostDelete = () => {
  const [deletedPost, setDeletedPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptPostDelete = useCallback((postID, token, setPostViewed) => {
    return fetch(`http://localhost:3000/blogAPI/post/${postID}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setDeletedPost(data);
          setPostViewed(null);
          navigate("/posts");
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { deletedPost, error, loading, attemptPostDelete };
};

export default usePostDelete;
