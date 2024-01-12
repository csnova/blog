import { useState, useEffect } from "react";

const getStats = () => {
  const [statsInfo, setStatsInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/blogAPI", {
      method: "GET",
    })
      .then(async (response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        try {
          const data = await response.json();
          setStatsInfo(data);
        } catch (error) {
          setError(error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return { statsInfo, error, loading };
};

export default getStats;
