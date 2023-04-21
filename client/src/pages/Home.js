import React, { useEffect } from "react";

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
  const theme = useTheme();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles", {
        headers: {},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
    };

    fetchArticles();
  }, [dispatch, user]);

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
