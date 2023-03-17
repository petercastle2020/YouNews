import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import ArticleForm from "./pages/ArticleForm";
// import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ArticlePage from "./pages/ArticlePage";
import MyArticles from "./pages/MyArticles";
import UserProfile from "./pages/UserProfile";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <div className="pages">
          <Routes>
            <Route path="/my" element={<MyArticles />} />
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/new-article"
              element={<ArticleForm action="create" />}
            />
            <Route path="/edit/:id" element={<ArticleForm action="edit" />} />
            <Route path="/api/user/:id" element={<UserProfile />} />
            <Route path="/api/articles/:id" element={<ArticlePage />} />
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
  );
}

export default App;
