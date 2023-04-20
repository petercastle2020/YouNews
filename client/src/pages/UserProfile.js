import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleCard from "../components/MediaCard";
import UserProfileDisplay from "../components/UserProfileDisplay";
import CircularIndeterminate from "../components/CircularIndeterminate";

// MUI
import { Box } from "@mui/material";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    Promise.all([
      // get User
      fetch(`/api/user/${id}`).then((response) => response.json()),
      //get all articles from User
      fetch(`/api/articles/user/${id}/articles`).then((response) =>
        response.json()
      ),
    ])
      .then(([userData, articleData]) => {
        setUser(userData.user);
        setArticles(articleData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularIndeterminate size={100} />
      </Box>
    );
  }

  return (
    <div className="user-profile">
      <UserProfileDisplay
        avatar={user.avatar}
        name={user.name}
        handle={user.handle}
        joinedAt={user.createdAt}
      />
      {articles.length === 0 ? (
        <p>No articles to display</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "2rem",
          }}
        >
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </Box>
      )}
    </div>
  );
};

export default UserProfile;
