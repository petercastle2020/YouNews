import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";

// pages & components
import Home from "./pages/Home";
import ArticleForm from "./pages/ArticleForm";
// import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ArticlePage from "./pages/ArticlePage";
import MyArticles from "./pages/MyArticles";
import UserProfile from "./pages/UserProfile";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

// #212121
// #424242
// #323232
// #121212

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#666",
    },
    contrastFromBackGround: {
      main: "#ffffff",
    },
    contrastBorder: {
      main: "#aab4be",
    },
    link: {
      main: "#1976d2",
    },
    blueHover: {
      main: "#00a9e0",
    },
    heartRed: {
      main: "#FF2D55",
    },
  },

  // other properties
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#f5f5f5",
    },
    secondary: {
      main: "#aab4be",
    },
    contrastFromBackGround: {
      main: "#434242",
    },
    contrastBorder: {
      main: "#212121",
    },
    link: {
      main: "#1976d2",
    },
    blueHover: {
      main: "#00a9e0",
    },
    heartRed: {
      main: "#FF2D55",
    },
  },
  // other properties
});

function App() {
  const { user } = useAuthContext();

  //Theme
  const [theme, setTheme] = useState(darkTheme);
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.palette.mode === "dark" ? lightTheme : darkTheme
    );
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#323232" : "#f5f5f5",
        }}
      >
        <div className="App">
          <BrowserRouter>
            <ResponsiveAppBar toggleTheme={toggleTheme} />
            <div className="pages">
              <Routes>
                <Route
                  path="/my"
                  element={user ? <MyArticles /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Home user={user} />} />
                <Route
                  path="/new-article"
                  element={
                    user ? (
                      <ArticleForm action="create" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/edit/:id"
                  element={
                    user ? (
                      <ArticleForm action="edit" />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/articles/:id" element={<ArticlePage />} />
                <Route
                  path="/signup"
                  element={user ? <Navigate to="/" /> : <Signup />}
                />
                <Route
                  path="/login"
                  element={user ? <Navigate to="/" /> : <Login />}
                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
