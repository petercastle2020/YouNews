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

import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";
import { useAuthContext } from "../hooks/useAuthContext";
import LikeButton from "./LikeButton";

import DOMPurify from "dompurify";
// date fns
import { format, max } from "date-fns";
// Parse HTML into text and keep format
import Parser from "html-react-parser";
import { maxWidth } from "@mui/system";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const MediaCard = ({ article, user }) => {
  // check userAuth is ready and set Loading to False.
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  // destructuring article
  const { title, subtitle, img, content, createdAt, _id } = article;
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

  // Likes
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  //headers to pass the Auth
  //To avoid useEffect running headers dependence every time it re-render, the utilization of useMemo deployed.
  const headers = useMemo(() => {
    if (!user) return {};
    return { Authorization: `Bearer ${user.token}` };
  }, [user]);
  // useEffect(() => {
  //   if (user) {
  //     setHeaders({ Authorization: `Bearer ${user.token}` });
  //   }
  // }, [user]);

  // const fetchLikesCount = useCallback(async () => {
  //   const res = await fetch(`/api/like/${_id}/count`);
  //   const data = await res.json();
  //   console.log("called");
  //   setLikeCount(data.likeCount);
  // }, [_id]);

  // useEffect(() => {
  //   fetchLikesCount();
  // }, [fetchLikesCount]);

  // Get like Count from DB
  useEffect(() => {
    const fetchLikesCount = async () => {
      const res = await fetch(`/api/like/${_id}/count`);
      const data = await res.json();
      setLikeCount(data.likeCount);
    };

    fetchLikesCount();
  }, [_id]);

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

  // Handle LIKE click
  const handleLikeClick = async (liked) => {
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
    setLikeCount(data.likeCount);
  };

  // Check to see Loading status.
  useEffect(() => {
    if (headers) {
      setIsLoading(false);
    }
  }, [headers]);

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
        <Card sx={{ width: "100%", maxWidth: 500, marginBottom: "1.5rem" }}>
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
            {/* <Typography
          variant="body2"
          sx={{ textAlign: "right", marginRight: "1rem" }}
        >
          {format(new Date(createdAt), "MM/dd/yyyy")}
        </Typography> */}
            <LikeButton
              likesCount={likeCount}
              isLiked={isLiked}
              onUpdateLikes={handleLikeClick}
            ></LikeButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default MediaCard;
