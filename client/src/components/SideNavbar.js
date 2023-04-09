import { useTheme } from "@mui/material/styles";
// MUI
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const categories = [
  "Tech",
  "Crypto",
  "Entertainment",
  "Science",
  "Reviews",
  "Podcasts",
  "Games",
  "Health",
  "Sports",
  "Food",
  "Books",
];
// #F3EFE0
// #434242
// #222222
// #22A39F

const SideNavbar = () => {
  const theme = useTheme();
  return (
    <List
      sx={{
        width: "100%",
        mb: 2,
        border: "1px solid",
        borderColor: `${theme.palette.contrastBorder.main}`,
        borderRadius: 1,
        backgroundColor: `${theme.palette.contrastFromBackGround.main}`,
      }}
      aria-label="contacts"
    >
      {categories.map((text, index) => (
        <ListItem
          key={text}
          disablePadding
          sx={{
            fontFamily: "Verdana, 'Source Sans Pro', sans-serif",
            fontWeight: 700,
            "&:hover": {
              backgroundColor: theme.palette.blueHover.main,
            },
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ color: theme.palette.primary.main }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SideNavbar;
