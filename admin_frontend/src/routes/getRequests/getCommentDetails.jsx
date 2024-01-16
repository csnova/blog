import { useState, useEffect } from "react";

const getCommentDetails = (postID, commentID) => {
  const [commentDetails, setCommentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/blogAPI/post/${postID}/${commentID}`, {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setCommentDetails(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { commentDetails, error, loading };
};

export default getCommentDetails;
