// MUI
import { Box, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

import { useTheme } from "@mui/system";

import { useNavigate } from "react-router-dom";

import { useEffect, useState, useRef } from "react";
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
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  // const pic =
  //   "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

  const handleSearch = () => {
    // searchQuery will be the search term.
    const searchArticlesAndUsers = async (searchQuery) => {
      try {
        const response = await fetch(`/api/searchData/search?q=${searchQuery}`);
        const data = await response.json();
        const resultsArray = data.SearchResponse;
        console.log(data);
        // here will set the searchResults.
        setSearchResults(resultsArray);
        // return data;
      } catch (error) {
        console.error(error);
      }
    };

    searchArticlesAndUsers(searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (docId, type) => {
    // Send user to result(REDIRECT TO RESOURCE).
    // user Profile router = "/api/user/:id"
    // article router = "/api/articles/:id"
    const userRoute = `/user/${docId}`;
    const articleRoute = `/articles/${docId}`;

    // hide previous old results
    setSearchResults([]);

    if (type === "user") {
      navigate(userRoute);
    } else {
      navigate(articleRoute);
    }
  };

  // Click Outside.
  const handleClickOutside = (event) => {
    if (
      searchResultsRef.current &&
      !searchResultsRef.current.contains(event.target)
    )
      // Clicked outside of search results, hide it
      setSearchResults([]);
  };

  useEffect(() => {
    // Add event listener to document when component mounts
    document.addEventListener("click", handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
          ref={searchResultsRef}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "background.paper",
            zIndex: 2,
            boxShadow: 1,
            border: "1px solid",
            borderColor: `${theme.palette.contrastBorder.main}`,
            borderRadius: 1,
          }}
        >
          {searchResults.map((result, index) => (
            <SearchResult key={index} {...result} onClick={handleResultClick} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchBox;
