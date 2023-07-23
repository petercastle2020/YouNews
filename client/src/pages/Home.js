import React, { useEffect, useState } from "react";

// Components
import MediaCard from "../components/MediaCard";
import TrendingTab from "../components/TrendingTab";
import { useArticlesContext } from "../hooks/useArticlesContext";

// MUI
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/system";

const BoxStyled = styled(Box)({
  minHeight: "100%",
  display: "grid",
  paddingTop: "1rem",
  gridTemplateColumns: "4fr 2fr",
  gap: "1rem",

  "@media (max-width: 900px)": {
    gridTemplateColumns: "5fr 4fr",
  },

  "@media (max-width: 800px)": {
    gridTemplateColumns: "1fr",
  },
});

const BoxArticlesStyled = styled(Box)({
  margin: "0 auto",
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  alignItems: "flex-start",

  "@media (max-width: 550px)": {
    with: "100%",
    padding: "0.5rem",
  },
});

const Home = ({ user }) => {
  const { articles, dispatch } = useArticlesContext();
  // TURN THE FOLLOWING IN FOLLOWING CONTEXT
  const [followingUsers, setFollowingUsers] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const user = localStorage.getItem("user");
        if (!user) {
          console.log("User not available");
          return;
        }
        const userObj = JSON.parse(user);
        const userId = userObj._id;

        const response = await fetch(`/api/user/${userId}/following`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data.followingUsersIds);
          setFollowingUsers(data.followingUsersIds);
          // fetchFollowingArticles();
        } else {
          console.error("Failed to fetch following users");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFollowingUsers();
  }, [user]);

  useEffect(() => {
    const fetchFollowingArticles = async () => {
      try {
        if (followingUsers.length === 0) {
          return;
        }

        const promises = followingUsers.map(async (followingUser) => {
          try {
            console.log(followingUsers);
            const response = await fetch(
              `api/articles?user_id=${followingUser}`
            );
            if (response.ok) {
              const ArticlesArray = await response.json();
              console.log(ArticlesArray);
              return ArticlesArray;
            } else if (response.status === 404) {
              console.error(`User ${followingUser} doesn't have articles yet.`);
              return [];
            } else {
              console.error(
                `Failed to fetch articles for user ${followingUser}: ${response.status} - ${response.statusText}`
              );
              return [];
            }
          } catch (error) {
            console.error(`Failed to fetch articles for user ${followingUser}`);
            return [];
          }
        });

        const articlesData = await Promise.all(promises);
        console.log(articlesData);

        const allArticles = articlesData.flat();
        console.log(allArticles);
        // THEN SET THE ARTICLES HERE.
        dispatch({ type: "SET_ARTICLES", payload: allArticles });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowingArticles();
  }, [followingUsers, dispatch]);

  return (
    <BoxStyled>
      <BoxArticlesStyled
        sx={{
          border: "1px solid",
          borderColor: `${theme.palette.contrastBorder.main}`,
          borderRadius: 1,
        }}
      >
        {articles &&
          articles.map((article) => (
            <MediaCard key={article._id} article={article} user={user} />
          ))}
      </BoxArticlesStyled>
      <Box position="relative">
        <Box sx={{ position: "fixed" }}>
          <TrendingTab />
        </Box>
      </Box>
    </BoxStyled>
  );
};

export default Home;
