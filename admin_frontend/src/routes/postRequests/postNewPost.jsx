// http://localhost:3000/blogAPI/post/create -H "Content-Type: application/json" -d
// '{"title":"Lemon Blueberry Cake", "text":"Today I made this great lemon blueberry cake! Next time Im on Ill post the recipe.", "published": true}'

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNewPost = () => {
  const [newPost, setNewPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptNewPost = useCallback((title, text, published, token) => {
    return fetch(`http://localhost:3000/blogAPI/post/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text, published, token }),
    })
      .then(async (response) => {
        try {
          let data = await response.json();
          console.log(data);
          setNewPost(data);
          navigate("/posts");
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { newPost, error, loading, attemptNewPost };
};

export default useNewPost;
