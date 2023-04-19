import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import UserMediaCard from "../components/UserMediaCard";
import UserProfileDisplay from "../components/UserProfileDisplay";
import CircularIndeterminate from "../components/CircularIndeterminate";
import { useArticlesContext } from "../hooks/useArticlesContext";

// MUI
import { Snackbar, Alert, Box } from "@mui/material";

const MyArticles = () => {
  const { articles, showAlert, alertType, dispatch } = useArticlesContext();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState(null); // initialize userData state

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user.token) {
        // Wait for 1 second before trying again
        setTimeout(() => fetchArticles(), 1000);
      }
      const response = await fetch("/api/articles/my", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
    };
    if (user) {
      fetchArticles();
    }
  }, [dispatch, user]);

  // GET user info
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.token) {
        // Wait for 1 second before trying again
        setTimeout(() => fetchUserData(), 1000);
      }
      const response = await fetch(`/api/searchData/users?email=${user.email}`);
      const json = await response.json();

      if (response.ok) {
        setUserData(json); // set userData state with user data
      }
    };
    if (user) {
      fetchUserData();
    }
  }, [user]);

  console.log(userData);

  // ALERT STATES
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleAlertOpen = () => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setIsAlertOpen(false);
    dispatch({ type: "HIDE_ALERT" });
  };

  useEffect(() => {
    if (showAlert) handleAlertOpen();
  }, [showAlert]);

  if (!userData) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularIndeterminate size={100} />
      </Box>
    );
  }

  return (
    <Box>
      {userData && (
        <UserProfileDisplay
          avatar={user.avatar}
          name={userData.name}
          handle={userData.handle}
          joinedAt={userData.createdAt}
        />
      )}
      <Box sx={{ padding: "1rem" }}>
        {articles &&
          articles.map((article) => (
            <UserMediaCard key={article._id} article={article} />
          ))}
      </Box>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={3000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        {alertType === "success" ? (
          <Alert onClose={handleAlertClose} severity="success">
            Item has been successfully deleted.
          </Alert>
        ) : alertType === "failure" ? (
          <Alert onClose={handleAlertClose} severity="error">
            Failed to delete item.
          </Alert>
        ) : null}
      </Snackbar>
    </Box>
  );
};

export default MyArticles;
