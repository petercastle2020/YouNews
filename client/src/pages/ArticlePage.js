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
    <div class="article">
      <h1 class="article_title">{ArticlePage.title}</h1>
      <h2 class="article_subtitle">{ArticlePage.subtitle}</h2>
      <img src={ArticlePage.img} alt="article-img" class="article_image" />
      <p class="article_content">{ArticlePage.content}</p>
    </div>
  );
};

export default ArticlePage;
