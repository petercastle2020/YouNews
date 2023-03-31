// MUI
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LikeButton = ({ likesCount, isLiked, onUpdateLikes }) => {
  const handleClick = () => {
    onUpdateLikes(!isLiked);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={handleClick}>
        {isLiked ? (
          <FavoriteIcon color="heartRed" />
        ) : (
          <FavoriteBorderIcon color="secondary" />
        )}
      </IconButton>
      {likesCount !== 0 && (
        <Typography variant="body2" color="secondary">
          {likesCount}
        </Typography>
      )}
    </Box>
  );
};

export default LikeButton;
