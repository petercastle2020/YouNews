import React, { useEffect } from "react";

// Components
import MediaCard from "../components/MediaCard";
import TrendingTab from "../components/TrendingTab";
import { useArticlesContext } from "../hooks/useArticlesContext";

const Home = ({ user }) => {
  const { articles, dispatch } = useArticlesContext();

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

    fetchArticles();
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="articles">
        {articles &&
          articles.map((article) => (
            <MediaCard key={article._id} article={article} user={user} />
          ))}
      </div>
      <div className="trending">
        <TrendingTab />
      </div>
    </div>
  );
};

export default Home;
