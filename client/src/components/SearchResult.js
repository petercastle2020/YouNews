// MUI
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { useTheme } from "@mui/system";

const SearchResult = ({ _id, img, title, email, onClick }) => {
  const theme = useTheme();

  const handleClick = () => {
    const userOrArticle = email ? "user" : "article";
    onClick(_id, userOrArticle);
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.palette.grayHover.main,
          cursor: "pointer",
        },
      }}
      onClick={handleClick}
    >
      {email ? (
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar alt="Avatar" src="" />
        </Box>
      ) : (
        <CardMedia image={img} alt="card-media-img" sx={{ width: "30%" }} />
      )}
      <CardContent sx={{ display: "flex", padding: "10px" }}>
        <Typography variant="subtitle1">{title ? title : email}</Typography>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
