import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import ArticleCard from "../components/ArticleCard";
import { useArticlesContext } from "../hooks/useArticlesContext";

const Home = () => {
  const { articles, dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles", {
        headers: {},
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
      <div className="articles">
        {articles &&
          articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
      </div>
    </div>
  );
};

export default Home;
