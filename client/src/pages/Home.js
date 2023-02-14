import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Components
import ArticleDetails from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";
import { useArticlesContext } from "../hooks/useArticlesContext";

const Home = () => {
  const { articles, dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles", {
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
      <div className="articles">
        {articles &&
          articles.map((article) => (
            <ArticleDetails key={article._id} article={article} />
          ))}
      </div>
      <ArticleForm />
    </div>
  );
};

export default Home;
