import React from "react";
import { Link } from "react-router-dom";

// date fns
import { format } from "date-fns";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h2>
        <strong>{article.title}</strong>
      </h2>
      <h4>{article.subtitle}</h4>
      <img src={article.img} alt="article-img" />
      <pre>
        <p>{article.content}</p>
        <Link to={`/api/articles/${article._id}`}>Read more...</Link>
      </pre>
      <p>{format(new Date(article.createdAt), "MM/dd/yyyy")}</p>
    </div>
  );
};

export default ArticleCard;
