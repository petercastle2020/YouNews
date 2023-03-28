import { useParams, Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
//date format
import format from "date-fns/format";
// DOMPurify
import DOMPurify from "dompurify";
// Parse HTML into text and keep format
import Parser from "html-react-parser";

import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";
// MUI
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ArticlePage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [ArticlePage, setArticlePage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get unique article by id
        const response = await fetch(`/api/articles/${id}`);
        //data has the document and document's user_id
        const data = await response.json();
        setArticlePage(data);
        setUserId(data.user_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!ArticlePage) {
    return <div>Loading...</div>;
  }

  // destructuring.
  const { title, subtitle, img, content, createdAt, user_email } = ArticlePage;

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
  const sanitizedContent = getSanitizedAndTruncatedText(content);

  // Parse content with tags
  const displayContent = Parser(sanitizedContent);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "1rem auto 1rem auto",
        maxWidth: "650px",
        color: theme.palette.primary.main,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          width: "100%",
        }}
      >
        <Typography variant="h4">{sanitizedTitle}</Typography>
        <Typography variant="h5" sx={{ color: theme.palette.secondary.main }}>
          {sanitizedSubtitle}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center" }}
          >
            By{" "}
            <RouterLink
              className="article-author-link"
              to={`/api/user/${userId}`}
            >
              {user_email}
            </RouterLink>
          </Typography>
          <div className="date">
            <p>{format(new Date(createdAt), "MM/dd/yyyy")}</p>
          </div>
        </Box>
      </Box>

      <img src={img} alt="article-img" className="article-image" />
      <Box
        sx={{
          fontSize: "1.2rem",
          fontFamily: "'Source Sans Pro', sans-serif",
          "& p": { margin: 0 },
        }}
      >
        {displayContent}
      </Box>
    </Box>
  );
};

export default ArticlePage;
