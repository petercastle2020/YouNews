import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [articles, setArticles] = useState([]);

  //   useEffect(() => {
  //     fetch(`/api/user/${id}`)
  //       .then((response) => response.json())
  //       .then((data) => setUser(data))
  //       .catch((error) => console.error(error));

  //     fetch(`/api/articles/user/${id}/articles`)
  //       .then((response) => response.json())
  //       .then((data) => setArticles(data))
  //       .catch((error) => console.error(error));
  //   }, [id]);

  useEffect(() => {
    Promise.all([
      fetch(`/api/user/${id}`).then((response) => response.json()),
      fetch(`/api/articles/user/${id}/articles`).then((response) =>
        response.json()
      ),
    ])
      .then(([userData, articleData]) => {
        setUser(userData);
        setArticles(articleData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h1>{user.user_email}'s Profile</h1>
      <p>would be the user info.</p>

      <h2>Articles</h2>
      {articles.length === 0 ? (
        <p>No articles to display</p>
      ) : (
        <div className="articles">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
