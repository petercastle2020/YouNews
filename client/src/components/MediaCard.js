// MUI
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

import DOMPurify from "dompurify";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";

// date fns
import { format } from "date-fns";
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

const MediaCard = ({ article }) => {
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

  return (
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
        <Button size="small" onClick={navigateToReadMore}>
          Read More
        </Button>
        <Typography
          variant="body2"
          sx={{ textAlign: "right", marginRight: "1rem" }}
        >
          {format(new Date(createdAt), "MM/dd/yyyy")}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
