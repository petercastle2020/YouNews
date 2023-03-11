import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
