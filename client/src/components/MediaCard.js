import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";
import { useAuthContext } from "../hooks/useAuthContext";

// MUI
import * as React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";

// MUI Alert imports
import { Snackbar, Alert } from "@mui/material";

// Component
import LikeButton from "./LikeButton";

//DOMPurify
import DOMPurify from "dompurify";
// Parse HTML into text and keep format
import Parser from "html-react-parser";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MediaCard = ({ article, user }) => {
  const { dispatch, authError } = useAuthContext();
  // check userAuth is ready and set Loading to False.
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // destructuring article
  const { title, subtitle, img, content, _id, likeCount } = article;
  const MAX_PREVIEW_CHARS = 150;

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
  const sanitizedContent = getSanitizedAndTruncatedText(
    content,
    MAX_PREVIEW_CHARS
  );
  // Parse content with tags
  const displayContent = Parser(sanitizedContent);

  const navigateToReadMore = () => {
    navigate(`/api/articles/${_id}`);
  };

  // Use state to store the likeCount locally
  const [localLikeCount, setLocalLikeCount] = useState(likeCount);
  // Likes
  const [isLiked, setIsLiked] = useState(false);

  //headers to pass the Auth
  //To avoid useEffect running headers dependence every time it re-render, the utilization of useMemo deployed.
  const headers = useMemo(() => {
    if (!user) return {};
    return { Authorization: `Bearer ${user.token}` };
  }, [user]);

  // Check Like status
  useEffect(() => {
    if (!user) return;
    const fetchLikeCheck = async () => {
      const res = await fetch(`/api/like/${_id}/likeCheck`, {
        method: "GET",
        headers: headers,
      });
      const data = await res.json();
      setIsLiked(data.isLiked);
    };

    fetchLikeCheck();
  }, [_id, user, headers]);

  // Check to see Loading status.
  useEffect(() => {
    if (headers) {
      setIsLoading(false);
    }
  }, [headers]);

  // Handle LIKE click
  const handleLikeClick = async (liked) => {
    // Check if user is authenticated
    if (!user) {
      dispatch({
        type: "SET_AUTH_ERROR",
        payload: "Please, you must be logged in.",
      });
      setIsSnackbarOpen(true);
      return;
    }

    setIsLiked(liked);

    // method
    const method = liked ? "POST" : "DELETE";

    // Check for headers
    const headers = user ? { Authorization: `Bearer ${user.token}` } : {};

    const res = await fetch(`/api/like/${_id}`, {
      method: method,
      headers: headers,
    });
    const data = await res.json();
    setLocalLikeCount(data.likeCount);
  };

  // dispatch null value for authError when snackbar closes.
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen(false);
    dispatch({ type: "SET_AUTH_ERROR" });
  };

  const [SnackbarOpen, setIsSnackbarOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Skeleton
          variant="rounded"
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 500,
            marginBottom: "1.5rem",
          }}
        />
      ) : (
        <>
          <Card sx={{ width: "100%", maxWidth: 550, marginBottom: "1.5rem" }}>
            <CardMedia sx={{ height: 300 }} image={img} title="card-img" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {sanitizedTitle}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {bull} {sanitizedSubtitle}
              </Typography>
              <div>{displayContent}</div>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button size="small" onClick={navigateToReadMore} color="link">
                Read More
              </Button>
              <LikeButton
                likesCount={localLikeCount}
                isLiked={isLiked}
                onUpdateLikes={handleLikeClick}
              ></LikeButton>
            </CardActions>
          </Card>
          <Snackbar
            open={SnackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert onClose={handleSnackbarClose} severity="info">
              {authError}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
};

export default MediaCard;
