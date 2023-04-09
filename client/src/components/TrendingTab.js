import { useEffect, useState } from "react";

// useTheme
import { useTheme } from "@mui/material/styles";

// MUI
import { Typography, Box, Skeleton, Alert } from "@mui/material";

// Trending Card
import TrendingCard from "./TrendingCard";

const TrendingTab = () => {
  const theme = useTheme();
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const request = "GET";
    const path = "/api/articles/trending";

    const fetchTrendingArticles = async () => {
      try {
        const res = await fetch(path, {
          method: request,
        });
        const data = await res.json();
        setTrendingArticles(data.trendingArticles);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchTrendingArticles();
  }, []);

  return (
    <Box
      sx={{
        mb: 2,
        marginRight: "1rem",
        border: "1px solid",
        borderColor: `${theme.palette.contrastBorder.main}`,
        borderRadius: 1,
        maxWidth: "100%",
        backgroundColor: `${theme.palette.contrastFromBackGround.main}`,
      }}
    >
      <Typography
        variant="h5"
        color="primary"
        sx={{ padding: "1rem", margin: 0, fontWeight: "bold" }}
        gutterBottom
      >
        Trending
      </Typography>

      {isLoading ? (
        <>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            sx={{ marginBottom: "0.5rem" }}
          />
          <Skeleton variant="rectangular" width="100%" height={80} />
        </>
      ) : isError ? (
        <Alert severity="error">There was an error fetching the trending</Alert>
      ) : (
        trendingArticles &&
        trendingArticles.map((trendingArticle) => {
          return (
            <TrendingCard
              key={trendingArticle._id}
              article={trendingArticle}
            ></TrendingCard>
          );
        })
      )}
    </Box>
  );
};

export default TrendingTab;
