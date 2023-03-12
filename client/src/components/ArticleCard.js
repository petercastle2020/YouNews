import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";

// date fns
import { format } from "date-fns";
// Parse HTML into text and keep format
import Parser from "html-react-parser";

const ArticleCard = ({ article }) => {
  const { title, subtitle, img, content, createdAt, _id } = article;
  const MAX_PREVIEW_CHARS = 150;

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
  const sanitizedContent = getSanitizedAndTruncatedText(
    content,
    MAX_PREVIEW_CHARS
  );

  return (
    <div className="article-card ">
      <h2 className="card-title">
        <strong>{sanitizedTitle}</strong>
      </h2>
      <p className="card-subtitle">{sanitizedSubtitle}</p>
      <img src={img} alt="article-img" className="card-img" />
      <div>
        <div className="card-content">{Parser(sanitizedContent)}</div>
        <Link to={`/api/articles/${_id}`} className="card-link-readmore">
          Read more
        </Link>
      </div>
      <p className="card-date">{format(new Date(createdAt), "MM/dd/yyyy")}</p>
    </div>
  );
};

export default ArticleCard;
