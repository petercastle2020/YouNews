// MUI
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";

import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useTheme } from "@mui/system";

const AccountPanel = ({
  avatar,
  name,
  email,
  handle,
  joinedAt,
  editing,
  handleAvatarChange,
  handleNameChange,
  handleEmailChange,
  handleHandleChange,
  handleEditClick,
  handleSaveClick,
}) => {
  const theme = useTheme();
  return (
    <Box
      component="form"
      sx={{ marginTop: "2rem", color: theme.palette.primary.main }}
      onSubmit={handleSaveClick}
    >
      <Typography variant="h5" textAlign={"center"} gutterBottom>
        Account Information
      </Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardMedia
          image={avatar}
          title="user-img"
          sx={{
            position: "relative",
            borderRadius: "50%",
            width: "10rem",
            height: "10rem",
            margin: "2rem 4rem",
            border: "2px solid black",
            boxSizing: "content-box",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
            }}
            aria-label="change avatar"
            component="span"
            onClick={handleAvatarChange}
          >
            <PhotoCameraIcon />
          </IconButton>
        </CardMedia>

        <TextField
          required
          id="standard-required"
          label="Name"
          variant="standard"
          value={name}
          onChange={handleNameChange}
          InputProps={{ readOnly: false }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: "4rem",
        }}
      >
        <TextField
          required
          id="standard-required"
          label="Email"
          variant="standard"
          value={email}
          onChange={handleEmailChange}
          InputProps={{ readOnly: false }}
        />
        <TextField
          required
          id="standard-required"
          label="@"
          variant="standard"
          value={handle}
          onChange={handleHandleChange}
          InputProps={{ readOnly: false }}
        />
      </Box>
      <Box
        sx={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}
      >
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <CalendarMonthIcon sx={{ marginRight: "0.2rem" }} />
          Joined: {joinedAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default AccountPanel;
