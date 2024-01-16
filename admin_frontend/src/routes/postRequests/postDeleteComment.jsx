import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useCommentDelete = () => {
  const [deletedComment, setDeleteComment] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptCommentDelete = useCallback(
    (postID, commentID, token, redirect) => {
      return fetch(
        `http://localhost:3000/blogAPI/post/${postID}/${commentID}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      )
        .then(async (response) => {
          try {
            let data = await response.json();
            setDeleteComment(data);
            if (redirect) navigate("/posts");
          } catch (error) {
            setError(error);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { deletedComment, error, loading, attemptCommentDelete };
};

export default useCommentDelete;
