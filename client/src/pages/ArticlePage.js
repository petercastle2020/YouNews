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
      <div className="article_header">
        <h1 className="article_title">{ArticlePage.title}</h1>
        <h2 className="article_subtitle">{ArticlePage.subtitle}</h2>
        <div className="article_author">
          By{" "}
          <a href="/author" className="article_author">
            {ArticlePage.user_email}
          </a>
        </div>
      </div>

      <img src={ArticlePage.img} alt="article-img" className="article_image" />
      <p className="article_content">{ArticlePage.content}</p>
    </div>
  );
};

export default ArticlePage;
