// MUI
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const SearchResult = ({ img, title, onClick }) => {
  return (
    <Card onClick={onClick}>
      <CardMedia image={img} alt="card-media-img" sx={{ width: "30%" }} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
