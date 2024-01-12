import { useState, useEffect } from "react";

const getPosts = () => {
  const [postInfo, setPostInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/blogAPI/posts", {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setPostInfo(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { postInfo, error, loading };
};

export default getPosts;
