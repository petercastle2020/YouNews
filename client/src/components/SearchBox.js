// MUI
import { Box, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
// COMPONENTS
import SearchResult from "./SearchResult";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const pic =
    "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

  const handleSearch = () => {
    // SET results state, and show it.
    console.log("djfljdsfsljsdlfj");
    setSearchResults([
      {
        img: pic,
        title: "this is the title.",
      },
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = () => {
    // Send user to result.
    console.log("Result CLICKED...");
  };

  return (
    <Box position="relative">
      <Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </Search>
      </Box>
      {searchResults.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "background.paper",
            zIndex: 2,
            boxShadow: 1,
          }}
        >
          {searchResults.map((result, index) => (
            <SearchResult
              key={index}
              img={result.img}
              title={result.title}
              onClick={handleResultClick}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;
