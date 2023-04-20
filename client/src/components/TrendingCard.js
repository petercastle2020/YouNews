import { useNavigate } from "react-router-dom";

//DOMPurify
import DOMPurify from "dompurify";

// MUI
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";

const TrendingCardStyled = styled(Card)({
  display: "flex",
  flexDirection: "row",
  alignItem: "center",
  width: "100%",
  position: "relative",
  marginTop: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    cursor: "pointer",
  },
});

const TrendingCardMediaStyled = styled(CardMedia)({
  minWidth: "30%",
  minHeight: "20%",
  objectFit: "cover",
});

const TrendingCardContentStyled = styled(CardContent)({
  flexGrow: 0,
  lineHeight: 1,
  padding: "0.5rem",
});

const TrendingCard = ({ article }) => {
  const navigate = useNavigate();
  // destructuring article
  const { title, img, _id } = article;
  const sanitizedTitle = DOMPurify.sanitize(title);

  // handle TrendingCard click
  const handleTrendingCardClick = () => {
    navigate(`/articles/${_id}`);
  };

  return (
    <TrendingCardStyled onClick={handleTrendingCardClick}>
      <TrendingCardMediaStyled image={img} />
      <TrendingCardContentStyled>
        <Typography variant="subtitle2" sx={{ fontSize: { md: "1rem" } }}>
          {sanitizedTitle}
        </Typography>
      </TrendingCardContentStyled>
    </TrendingCardStyled>
  );
};

export default TrendingCard;
