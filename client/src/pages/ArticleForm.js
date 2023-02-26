import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ArticleForm = () => {
  const { id } = useParams();
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Fetch article data from your API or database using the id parameter
  useEffect(() => {
    fetch(`/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setSubtitle(data.subtitle);
        setImg(data.img);
        setContent(data.content);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("file", img);
    formData.append("content", content);

    const options = {
      method: "POST",
      headers: {
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
        Authorization: `Bearer ${user.token}`,
      },
      body: formData,
    };

    // Remove 'Content-Type' header to allow browser to add
    // along with the correct 'boundary'
    delete options.headers["Content-Type"];
    // I guess you could set hears: {"Content-Type": undefined} !!!!!!!!!

    const response = await fetch("/api/articles", options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

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
    <form
      encType="multipart/form-data"
      className="create"
      onSubmit={handleSubmit}
    >
      <h3>Add a New Article</h3>
      <label>Title:</label>
      <input
        id="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>SubTitle:</label>
      <input
        id="subtitle"
        type="text"
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
        className={emptyFields.includes("subtitle") ? "error" : ""}
      />
      <label>Image:</label>

      <input
        id="file"
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        value={img[0]}
        name="uploadFile"
        className={emptyFields.includes("img") ? "error" : ""}
      />
      <label>Content:</label>
      <div className="text-area-parent">
        <textarea
          id="content"
          type="text"
          rows="10"
          cols="60"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className={emptyFields.includes("content") ? "error" : ""}
        />
      </div>
      <button>Add Article</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArticleForm;
