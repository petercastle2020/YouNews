import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// utils
import { convertImageUrlToBase64 } from "../utils/convertImageUrlToBase64";
//
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

  const [isEditing, setIsEditing] = useState(false);

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
          setIsEditing(true);
        })
        .catch((error) => setError(error));
    }
  }, [id]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImg(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const handleImageChange = (e) => {
    if (isEditing) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      const file = e.target.files[0];
      setImg(file);
      console.log(file);
    }
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
      // Check if img is a string (URL) or a File object
      if (typeof img === "string" && isEditing) {
        // img is a URL, convert to base64
        const base64Img = await convertImageUrlToBase64(img);
        formData.append("file", base64Img);
      } else {
        formData.append("file", img);
      }
      formData.append("content", content);

      console.log(formData);

      const URL = isEditing ? `/api/articles/${id}` : "/api/articles";
      const method = isEditing ? "PATCH" : "POST";
      const options = {
        method: method,
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

      const response = await fetch(URL, options)
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res;
        })
        .catch((error) => {
          console.log(error);
          setError(error || "Something went wrong.");
        });

      if (response && !response.ok) {
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
        console.log(isEditing ? "article edited." : "new article added.", json);
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
      <label>
        {isEditing && img
          ? `Image already uploaded: ${img}`
          : "Choose an image:"}
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        name="uploadFile"
        className={emptyFields.includes("img") ? "error" : ""}
        {...(!isEditing && { required: true })}
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
      <button>{isEditing ? "Edit" : "Publish"}</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ArticleForm;
