import React, { useEffect } from "react";

// Components
import ArticleDetails from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";
import { useArticlesContext } from "../hooks/useArticlesContext";

const Home = () => {
  const { articles, dispatch } = useArticlesContext();

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_ARTICLES", payload: json });
      }
    };

    fetchArticles();
  }, [dispatch]);

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
