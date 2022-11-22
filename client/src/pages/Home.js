import React, { useEffect, useState } from "react";

// components
import ArticleDetails from "../components/ArticleDetails";
import ArticleForm from "../components/ArticleForm";

const Home = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch("/api/articles");
      const json = await response.json();

      if (response.ok) {
        setArticles(json);
      }
    };

    fetchArticles();
  }, []);

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
