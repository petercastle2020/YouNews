import { useState } from "react";

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const article = {
      title,
      subTitle,
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
    }

    if (response.ok) {
      setError(null);
      console.log("new article added.", json);
      setTitle("");
      setSubTitle("");
      setImg("");
      setContent("");
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
      />
      <label>SubTitle:</label>
      <input
        type="text"
        onChange={(e) => setSubTitle(e.target.value)}
        value={subTitle}
      />
      <label>Image:</label>
      <input type="text" onChange={(e) => setImg(e.target.value)} value={img} />
      <label>Content:</label>
      <textarea
        type="text"
        rows="10"
        cols="40"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button>Add Article</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArticleForm;
