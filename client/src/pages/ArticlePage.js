import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ArticlePage = () => {
  const { id } = useParams();
  const [ArticlePage, setArticlePage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setArticlePage(data);
        fetch(`/api/user/email/${data.user_email}`)
          .then((response) => response.json())
          .then((userData) => {
            setUserId(userData.user_id);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!ArticlePage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article">
      <div className="article-header">
        <h1 className="article-title">{ArticlePage.title}</h1>
        <h2 className="article-subtitle">{ArticlePage.subtitle}</h2>
        <div className="article-author">
          By{" "}
          <Link className="article-author-link" to={`/api/user/${userId}`}>
            {ArticlePage.user_email}
          </Link>
        </div>
      </div>

      <img src={ArticlePage.img} alt="article-img" className="article-image" />
      <p className="article-content">{ArticlePage.content}</p>
    </div>
  );
};

export default ArticlePage;
