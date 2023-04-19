import { useRef } from "react";
// COMPONENTS
import JoinedAtComponent from "./JoinedAtComponent";

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
import SaveIcon from "@mui/icons-material/Save";

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
  handleSaveClick,
}) => {
  const theme = useTheme();

  const fileInputRef = useRef(null);

  const handleFileInputOpen = () => {
    fileInputRef.current.click();
  };

  const handleNewFile = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    handleAvatarChange(selectedFile);
  };

  return (
    <Box
      component="form"
      sx={{ marginTop: "2rem", color: theme.palette.primary.main }}
      onSubmit={(e) => handleSaveClick(e)}
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
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleNewFile}
          />
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
            onClick={handleFileInputOpen}
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
      <JoinedAtComponent joinedAt={joinedAt} />
      {editing ? (
        <Box
          sx={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <Button
          variant="contained"
          startIcon={<RestoreFromTrashIcon fontSize="large" />}
        >
          Discard changes
        </Button> */}
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon fontSize="large" />}
          >
            Save
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default AccountPanel;
