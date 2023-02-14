import React from "react";

import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import { format } from "date-fns";

const ArticleDetails = ({ article }) => {
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      console.log("must be logged in to delete.");
      return;
    }
    const response = await fetch("/api/articles/" + article._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ARTICLE", payload: json });
    }
  };

  return (
    <div className="article-details">
      <h2>
        <strong>{article.title}</strong>
      </h2>
      <h4>{article.subtitle}</h4>
      <img src={article.img} alt="article-img" />
      <pre>
        <p>{article.content}</p>
      </pre>
      <p>{format(new Date(article.createdAt), "MM/dd/yyyy")}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default ArticleDetails;
