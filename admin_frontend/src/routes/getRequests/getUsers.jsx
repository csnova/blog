import { useState, useEffect } from "react";

const getUsers = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/blogAPI/users", {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setUserInfo(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { userInfo, error, loading };
};

export default getUsers;
