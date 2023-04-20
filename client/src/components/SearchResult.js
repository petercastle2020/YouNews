// MUI
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";

import { useTheme } from "@mui/system";

const SearchResult = ({ _id, img, title, handle, name, avatar, onClick }) => {
  const theme = useTheme();

  const handleClick = () => {
    const userOrArticle = handle ? "user" : "article";
    onClick(_id, userOrArticle);
  };

  return (
    <Card
      sx={{
        display: "flex",
        height: "",
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
      {handle ? (
        <Box
          sx={{
            width: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar alt="Avatar" src={avatar} />
        </Box>
      ) : (
        <CardMedia image={img} alt="card-media-img" sx={{ width: "30%" }} />
      )}
      {handle ? (
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "0.5rem 0 0.5rem 0",
          }}
        >
          <Typography variant="subtitle1" sx={{ marginBottom: "0.5rem" }}>
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ margin: "0" }}>
            {handle}
          </Typography>
        </CardContent>
      ) : (
        <CardContent sx={{ display: "flex", padding: "10px" }}>
          <Typography variant="subtitle1">{title}</Typography>
        </CardContent>
      )}
    </Card>
  );
};

export default SearchResult;
