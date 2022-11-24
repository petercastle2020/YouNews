import { useState } from "react";

import { useArticlesContext } from "../hooks/useArticlesContext";

const ArticleForm = () => {
  const { dispatch } = useArticlesContext();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      title,
      subtitle,
      img,
      content,
    };

    const response = await fetch("/api/articles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(emptyFields);
    }

    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setTitle("");
      setSubtitle("");
      setImg("");
      setContent("");
      console.log("new article added.", json);
      dispatch({ type: "CREATE_ARTICLE", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Article</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>SubTitle:</label>
      <input
        type="text"
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
        className={emptyFields.includes("subtitle") ? "error" : ""}
      />
      <label>Image:</label>
      <input
        type="text"
        onChange={(e) => setImg(e.target.value)}
        value={img}
        className={emptyFields.includes("img") ? "error" : ""}
      />
      <label>Content:</label>
      <textarea
        type="text"
        rows="10"
        cols="40"
        onChange={(e) => setContent(e.target.value)}
        value={content}
        className={emptyFields.includes("content") ? "error" : ""}
      />
      <button>Add Article</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArticleForm;
