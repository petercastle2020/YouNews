import { React, useRef } from "react";
import { Link } from "react-router-dom";

import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import { format } from "date-fns";

const ArticleDetails = ({ article }) => {
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();
  const ellipsisRef = useRef(null);

  // destructuring.
  const { title, subtitle, img, content, createdAt, _id } = article;
  const MAX_PREVIEW_CHARS = 150;
  const preview = content.substr(0, MAX_PREVIEW_CHARS) + "...";

  const handleEllipsisClick = () => {
    ellipsisRef.current.focus();
  };

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
    <div className="article-card ">
      <button
        className="card-ellipsis"
        tabIndex="0"
        ref={ellipsisRef}
        onClick={handleEllipsisClick}
      >
        &#8942;
      </button>
      <ul className="card-dropdown-menu">
        <li>
          <Link to={`/api/articles/edit/${_id}`} className="card-link">
            Edit
          </Link>
        </li>
        <li>
          <span href="#">Delete</span>
        </li>
      </ul>
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
      <span onClick={handleClick}>delete</span>
    </div>

    // <div className="article-details">
    //   <h2>
    //     <strong>{title}</strong>
    //   </h2>
    //   <h4>{subtitle}</h4>
    //   <img src={img} alt="article-img" />
    //   <pre>
    //     <p>{content}</p>
    //     <Link to={`/api/articles/${_id}`}>Read more...</Link>
    //   </pre>
    //   <p>{format(new Date(article.createdAt), "MM/dd/yyyy")}</p>
    //   <span onClick={handleClick}>delete</span>
    // </div>
  );
};

export default ArticleDetails;
