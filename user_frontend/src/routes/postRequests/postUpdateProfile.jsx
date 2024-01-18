import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useUpdateProfile = () => {
  const [updatedProfile, setUpdatedProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const attemptUpdateProfile = useCallback(
    (name, username, email, userID, token, setCurrentUser) => {
      return fetch(`http://localhost:3000/blogAPI/user/${userID}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, token }),
      })
        .then(async (response) => {
          try {
            let data = await response.json();
            setUpdatedProfile(data);
            setCurrentUser(data.user);
            navigate("/blog/profile");
          } catch (error) {
            setError(error);
          }
        })
        .finally(() => setLoading(false));
    },
    []
  );

  return { updatedProfile, error, loading, attemptUpdateProfile };
};

export default useUpdateProfile;
