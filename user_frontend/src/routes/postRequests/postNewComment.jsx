import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNewComment = () => {
  const [newComment, setNewComment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptNewComment = useCallback((postID, text, userID, token) => {
    return fetch(`http://localhost:3000/blogAPI/post/${postID}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, userID, token }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          setNewComment(data);
          navigate("/blog/post");
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { newComment, error, loading, attemptNewComment };
};

export default useNewComment;
