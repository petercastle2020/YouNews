import { React, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import { format } from "date-fns";

const ArticleDetails = ({ article }) => {
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();
  const dropdownMenuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // destructuring.
  const { title, subtitle, img, content, createdAt, _id } = article;
  const MAX_PREVIEW_CHARS = 150;
  const preview = content.substr(0, MAX_PREVIEW_CHARS) + "...";

  useEffect(() => {
    // Add event listener to detect clicks outside of the dropdown menu
    const handleDocumentClick = (e) => {
      if (
        !dropdownMenuRef.current.contains(e.target) &&
        e.target.className !== "card-ellipsis"
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    // remove event listener on component unmount
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      console.log("must be logged in to delete.");
      return;
    }

    try {
      const response = await fetch("/api/articles/" + article._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "DELETE_ARTICLE", payload: json });
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting article", error);
      // customize the error message to show something more informative to user
      alert("Error deleting article. Please try again later.");
    }
  };

  return (
    <div className="article-card ">
      <button className="card-ellipsis" onClick={handleDropdownClick}>
        &#8942;
      </button>
      <ul
        className={`card-dropdown-menu ${isOpen ? "open" : ""}`}
        ref={dropdownMenuRef}
      >
        <li>
          <Link
            to={`/edit/${_id}`}
            className="card-link"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Edit
          </Link>
        </li>
        <li>
          <Link to="#" className="card-link" onClick={handleDeleteClick}>
            Delete
          </Link>
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
    </div>
  );
};

export default ArticleDetails;
