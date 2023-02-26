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
    if (id) {
      fetch(`/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setImg(data.img);
          setContent(data.content);
        })
        .catch((error) => setError(error));
    }
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    try {
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
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
          setError(error || "Something went wrong.");
        });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        const json = await response.json();
        setEmptyFields([]);
        setError(null);
        setTitle("");
        setSubtitle("");
        setImg("");
        setContent("");
        console.log("new article added.", json);
        dispatch({ type: "CREATE_ARTICLE", payload: json });
      }
    } catch (error) {
      console.log(error);
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
        onChange={handleImageChange}
        value={img}
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
