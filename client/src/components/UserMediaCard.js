import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
//Context
import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";
// date fns
import { format } from "date-fns";
//Components
import CircularIndeterminate from "./CircularIndeterminate";

// MUI
import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Skeleton,
} from "@mui/material";
import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const CardStyled = styled(Card)({
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
  width: "100%",
  minHeight: 200,
  position: "relative",
  marginBottom: "1rem",

  "@media (max-width: 650px)": {
    flexDirection: "column",
    alignItems: "stretch",
  },
});

const CardMediaStyled = styled(CardMedia)({
  // height: 200,
  // width: 250,
  minWidth: "30%",
  minHeight: 200,
  // flexShrink: 0,
  objectFit: "cover",
  "@media (max-width: 650px)": {
    width: "100%",
    minHeight: 300,
  },
});

const CardContentStyled = styled(CardContent)({
  flexGrow: 0,
  paddingRight: "3rem",

  // flexGrow: 1,
  // paddingLeft: "1rem",
});

const IconButtonStyled = styled(IconButton)({
  position: "absolute",
  top: 0,
  right: 0,
  "@media (max-width: 650px)": {
    position: "absolute",
    top: "auto",
    left: "auto",
    margin: "0 0.5rem 0 0",
  },
});

const DateTypography = styled(Typography)({
  position: "absolute",
  bottom: "0.3rem",
  right: "0.3rem",
  fontSize: "0.75rem",
  "@media (max-width: 650px)": {
    position: "relative",
    bottom: "auto",
    right: "auto",
    marginTop: "1rem",
  },
});

const UserMediaCard = ({ article }) => {
  const navigate = useNavigate();
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  // Spinner for Taking action
  const [isTakingAction, setIsTakingAction] = useState(false);

  // destructuring.
  const { title, subtitle, img, createdAt, _id } = article;

  // Format Date
  const formattedDate = format(new Date(createdAt), "MM/dd/yyyy");

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menu actions
  const handleEditClick = async (e) => {
    navigate(`/edit/${_id}`);
  };

  const handleView = async (e) => {
    navigate(`/api/articles/${_id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    // set to load action
    setIsTakingAction(true);

    if (!user) {
      console.log("must be logged in to delete.");
      return;
    }

    try {
      const response = await fetch("/api/articles/" + article._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "DELETE_ARTICLE_SUCCESS", payload: json });
        setIsTakingAction(false);
      } else {
        dispatch({ type: "DELETE_ARTICLE_FAILURE" });
        setIsTakingAction(false);
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (error) {
      dispatch({ type: "DELETE_ARTICLE_FAILURE" });
      setIsTakingAction(false);
      console.error("Error deleting article", error);
      // customize the error message to show something more informative to user
    }
  };

  const menuItems = [
    { text: "View", onClick: handleView },
    { text: "Edit", onClick: handleEditClick },
    { text: "Delete", onClick: handleDelete },
  ];

  if (!article) {
    return (
      <CardStyled>
        <Skeleton variant="rounded" width={"100%"} height={"100%"} />
      </CardStyled>
    );
  }

  return (
    <>
      <CardStyled>
        {isTakingAction ? (
          <>
            <CircularIndeterminate size={50} />
            <Skeleton variant="rounded" width={"100%"} height={"100%"} />
          </>
        ) : (
          <>
            <CardMediaStyled image={img} />

            <CardContentStyled>
              <Typography variant="h6">{sanitizedTitle}</Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                {bull} {sanitizedSubtitle}
              </Typography>
              <IconButtonStyled
                aria-label="settings"
                aria-controls="card-actions-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButtonStyled>
              <Menu
                id="card-actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item, index) => (
                  <MenuItem key={index} onClick={item.onClick}>
                    {item.text}
                  </MenuItem>
                ))}
              </Menu>
              <DateTypography>{formattedDate}</DateTypography>
            </CardContentStyled>
          </>
        )}
      </CardStyled>
    </>
  );
};

export default UserMediaCard;
