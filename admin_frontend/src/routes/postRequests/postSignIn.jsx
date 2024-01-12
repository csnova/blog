import { useState, useEffect } from "react";

const PostSignIn = ({ username, password }) => {
  const [signIn, setSignIn] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/blogAPI/user/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setSignIn(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { signIn, error, loading };
};

export default PostSignIn;
