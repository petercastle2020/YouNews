import { useEffect, useState } from "react";
//MUI
import { Box, CardMedia, Typography, Button } from "@mui/material";
// COMPONENTS
import JoinedAtComponent from "./JoinedAtComponent";

import { useTheme } from "@mui/system";

const UserProfileDisplay = ({ _id, name, handle, avatar, joinedAt }) => {
  const theme = useTheme();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isUserPage, setIsUserPage] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const user = localStorage.getItem("user");
        const userObj = JSON.parse(user);
        const token = userObj.token;

        if (userObj._id === _id || !_id) {
          setIsUserPage(true);
        } else {
          setIsUserPage(false);

          let AuthorizationToken = {};
          if (token) {
            AuthorizationToken = { Authorization: `Bearer ${token}` };

            const response = await fetch(`/api/user/${_id}/followStatus`, {
              method: "GET",
              headers: AuthorizationToken,
            });

            if (response.ok) {
              const data = await response.json();
              data.response.isFollowing
                ? setIsFollowing(true)
                : setIsFollowing(false);
            } else {
              // handle error.
              console.log("Error checking the Following status.");
            }
          } else {
            // User is not logged in,
            console.log("User not logged in.");
          }
        }
      } catch (error) {
        // Handle error
      }
    };

    checkFollowStatus();
  }, [_id]);

  const handleFollow = async () => {
    try {
      const user = localStorage.getItem("user");
      const userObj = JSON.parse(user);
      const token = userObj.token;

      let AuthorizationToken = {};
      if (token) {
        AuthorizationToken = { Authorization: `Bearer ${token}` };

        let endpoint = "";
        if (isFollowing) {
          endpoint = `/api/user/${_id}/unfollow`;
        } else {
          endpoint = `/api/user/${_id}/follow`;
        }

        const response = await fetch(endpoint, {
          method: "POST",
          headers: AuthorizationToken,
        });

        if (response.ok) {
          const data = await response.json();
          setIsFollowing(!isFollowing); // Toggle the value of isFollowing
          console.log(data);
        } else {
          // Handle error
          console.error("Follow/unfollow operation failed");
        }
      } else {
        // User is not logged in,
        console.log("User not logged in.");
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

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
        {!isUserPage && (
          <Button
            onClick={handleFollow}
            size="medium"
            variant="outlined"
            sx={{ marginTop: "1rem" }}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserProfileDisplay;
