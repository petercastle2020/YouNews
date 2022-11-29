import { useState } from "react";

import { useArticlesContext } from "../hooks/useArticlesContext";

const NewArticle = () => {
  const { dispatch } = useArticlesContext();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const file = document.getElementById("file");
    const content = document.getElementById("content");

    const formData = new FormData();

    formData.append("title", title.value);
    formData.append("subtitle", subtitle.value);
    formData.append("file", file.files[0]);
    formData.append("content", content.value);

    // const article = {
    //   title,
    //   subtitle,
    //   img,
    //   content,
    // };

    // const FormData =

    const options = {
      method: "POST",
      headers: {
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
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
        onChange={(e) => setImg(e.target.value)}
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

export default NewArticle;
