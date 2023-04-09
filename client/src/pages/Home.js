import React, { useEffect } from "react";

// Components
import MediaCard from "../components/MediaCard";
import TrendingTab from "../components/TrendingTab";
import SideNavbar from "../components/SideNavbar";
import { useArticlesContext } from "../hooks/useArticlesContext";

// MUI
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@mui/system";

const BoxStyled = styled(Box)({
  minHeight: "100%",
  display: "grid",
  // gridTemplateColumns: "2fr 1fr",
  gridTemplateColumns: "1fr 3fr 2fr",
  gap: "2rem",
  // height: "100vh",
  // overflow: "hidden",

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
  // scroll
  // height: "100vh",
  // overflowY: "scroll",
  // hide scrollbar
  // "::-webkit-scrollbar": {
  //   display: "none",
  // },
  // for firefox
  // scrollbarWidth: "none",

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
      <Box position="relative">
        <Box sx={{ position: "fixed" }}>
          <SideNavbar />
        </Box>
      </Box>
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
