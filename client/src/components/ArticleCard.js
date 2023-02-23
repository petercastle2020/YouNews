import React from "react";
import { Link } from "react-router-dom";

// date fns
import { format } from "date-fns";

const ArticleCard = ({ article }) => {
  const { title, subtitle, img, content, createdAt, _id } = article;
  const MAX_PREVIEW_CHARS = 150;
  const preview = content.substr(0, MAX_PREVIEW_CHARS) + "...";
  return (
    <div className="article-card ">
      <h2 className="card-title">
        <strong>{title}</strong>
      </h2>
      <p className="card-subtitle">{subtitle}</p>
      <img src={img} alt="article-img" className="card-img" />
      <pre>
        <p className="card-content">{preview}</p>
        <Link to={`/api/articles/${_id}`} className="card-link-readmore">
          Read more
        </Link>
      </pre>
      <p className="card-date">{format(new Date(createdAt), "MM/dd/yyyy")}</p>
    </div>
  );
};

export default ArticleCard;
