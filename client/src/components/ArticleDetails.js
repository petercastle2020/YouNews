import React from "react";

const ArticleDetails = ({ article }) => {
  return (
    <div className="article-details">
      <h2>
        <strong>{article.title}</strong>
      </h2>
      <h4>{article.subtitle}</h4>
      <img src={article.img} alt="article-img" />
      <p>{article.content}</p>
      <p>{article.createdAt}</p>
    </div>
  );
};

export default ArticleDetails;
