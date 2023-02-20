import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ArticlePage = () => {
  const { id } = useParams();
  const [ArticlePage, setArticlePage] = useState(null);

  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((response) => response.json())
      .then((data) => setArticlePage(data))
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
          <a href="/author" className="article-author-link">
            {ArticlePage.user_email}
          </a>
        </div>
      </div>

      <img src={ArticlePage.img} alt="article-img" className="article-image" />
      <p className="article-content">{ArticlePage.content}</p>
    </div>
  );
};

export default ArticlePage;
