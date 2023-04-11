import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import UserMediaCard from "../components/UserMediaCard";
import { useArticlesContext } from "../hooks/useArticlesContext";

// MUI
import { Snackbar, Alert, Box } from "@mui/material";

const MyArticles = () => {
  const { articles, showAlert, alertType, dispatch } = useArticlesContext();
  const { user } = useAuthContext();

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

  return (
    <div className="home">
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
    </div>
  );
};

export default MyArticles;
