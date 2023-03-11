import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";

// date fns
import { format } from "date-fns";

const ArticleCard = ({ article }) => {
  const { title, subtitle, img, content, createdAt, _id } = article;
  const MAX_PREVIEW_CHARS = 150;

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
  const preview = getSanitizedAndTruncatedText(content, MAX_PREVIEW_CHARS);

  return (
    <div className="article-card ">
      <h2 className="card-title">
        <strong>{sanitizedTitle}</strong>
      </h2>
      <p className="card-subtitle">{sanitizedSubtitle}</p>
      <img src={img} alt="article-img" className="card-img" />
      <div>
        <p className="card-content">{preview}</p>
        <Link to={`/api/articles/${_id}`} className="card-link-readmore">
          Read more
        </Link>
      </div>
      <p className="card-date">{format(new Date(createdAt), "MM/dd/yyyy")}</p>
    </div>
  );
};

export default ArticleCard;
