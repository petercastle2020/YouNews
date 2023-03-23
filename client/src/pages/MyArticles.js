import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import UserMediaCard from "../components/UserMediaCard";
import { useArticlesContext } from "../hooks/useArticlesContext";

const MyArticles = () => {
  const { articles, dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchArticles = async () => {
      if (!user.token) {
        // Wait for 1 second before trying again
        setTimeout(() => fetchArticles(), 1000);
      }
      const response = await fetch("/api/articles/my", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
    };
    if (user) {
      fetchArticles();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="user-articles">
        {articles &&
          articles.map((article) => (
            <UserMediaCard key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default MyArticles;
