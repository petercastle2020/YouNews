//MUI
import { Box, CardMedia, Typography } from "@mui/material";

import { useTheme } from "@mui/system";

const pic =
  "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

const UserProfileDisplay = ({ handle }) => {
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
          image={pic}
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
          Name Surname
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "1rem" }}>
          {handle}
        </Typography>
        <Typography variant="body2">Joined: April 2023</Typography>
      </Box>
    </Box>
  );
};

export default UserProfileDisplay;
