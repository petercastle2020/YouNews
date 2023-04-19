//MUI
import { Box, CardMedia, Typography } from "@mui/material";
// COMPONENTS
import JoinedAtComponent from "./JoinedAtComponent";

import { useTheme } from "@mui/system";

const UserProfileDisplay = ({ name, handle, avatar, joinedAt }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: `${theme.palette.contrastFromBackGround.main}`,
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        color: `${theme.palette.primary.main}`,
      }}
    >
      <Box sx={{ marginTop: "3rem" }}>
        <CardMedia
          image={avatar}
          title="user-img"
          sx={{
            borderRadius: "50%",
            margin: "auto",
            width: "10rem",
            height: "10rem",
            border: "2px solid black",
            boxSizing: "content-box",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          {name}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          {handle}
        </Typography>

        <JoinedAtComponent joinedAt={joinedAt} />
      </Box>
    </Box>
  );
};

export default UserProfileDisplay;
