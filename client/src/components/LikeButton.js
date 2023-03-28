// MUI
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LikeButton = ({ likesCount, isLiked, onClick }) => {
  const handleClick = () => {
    onClick(!isLiked);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleClick}>
        {isLiked ? (
          <FavoriteIcon color="heartRed" />
        ) : (
          <FavoriteBorderIcon color="heartRed" />
        )}
      </IconButton>
      <Typography variant="body2">{likesCount}</Typography>
    </Box>
  );
};

export default LikeButton;
