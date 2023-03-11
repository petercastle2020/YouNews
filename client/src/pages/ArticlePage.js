import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
//date format
import format from "date-fns/format";
// DOMPurify
import DOMPurify from "dompurify";
import { getSanitizedAndTruncatedText } from "../utils/getSanitizedAndTruncatedText";

const ArticlePage = () => {
  const { id } = useParams();
  const [ArticlePage, setArticlePage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get unique article by id
        const response = await fetch(`/api/articles/${id}`);
        //data has the document and document's user_id
        const data = await response.json();
        setArticlePage(data);
        setUserId(data.user_id);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!ArticlePage) {
    return <div>Loading...</div>;
  }

  // destructuring.
  const { title, subtitle, img, content, createdAt, user_email } = ArticlePage;

  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedSubtitle = DOMPurify.sanitize(subtitle);
  const sanitizedContent = getSanitizedAndTruncatedText(content);

  return (
    <div className="article">
      <div className="article-header">
        <h1 className="article-title">{sanitizedTitle}</h1>
        <h2 className="article-subtitle">{sanitizedSubtitle}</h2>
        <div className="author-and-date-wrapper">
          <div className="article-author">
            By{" "}
            <Link className="article-author-link" to={`/api/user/${userId}`}>
              {user_email}
            </Link>
          </div>
          <div className="date">
            <p>{format(new Date(createdAt), "MM/dd/yyyy")}</p>
          </div>
        </div>
      </div>

      <img src={img} alt="article-img" className="article-image" />
      <p className="article-content">{sanitizedContent}</p>
    </div>
  );
};

export default ArticlePage;
