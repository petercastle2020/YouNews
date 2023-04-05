import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// MUI
import {
  Alert,
  AlertTitle,
  Box,
  TextField,
  Input,
  Typography,
  InputLabel,
} from "@mui/material";

// Sanitize
import { sanitizeFormData } from "../utils/sanitizeFormData";
// Text Editor.
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Context
import { useArticlesContext } from "../hooks/useArticlesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ArticleForm = () => {
  const theme = useTheme();
  const { id } = useParams();
  const { dispatch } = useArticlesContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  // const [emptyFields, setEmptyFields] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  // Fetch article data from your API or database using the id parameter
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const res = await fetch(`/api/articles/${id}`);
          const data = await res.json();
          setTitle(data.title);
          setSubtitle(data.subtitle);
          setImg(data.img);
          setContent(data.content);
          setIsEditing(true);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  const fileInputExists = () => {
    const fileInput = document.getElementById("file");
    if (!fileInput || fileInput.files.length === 0) {
      console.log("No file iput or file not selected.");
      return false;
    }
    return true;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    if (fileInputExists) {
      formData.append("file", img);
    }
    formData.append("content", content);
    sanitizeFormData(formData);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    // Build and sanitize the formData
    const formData = createFormData();
    // Check that required fields are not empty
    const requiredFields = ["title", "subtitle", "content"];
    const emptyFields = requiredFields.filter((field) => !formData.get(field));
    if (emptyFields.length > 0) {
      setError(
        `Please fill in all the required fields: ${emptyFields.join(", ")}`
      );
      return;
    }
    // Check that img field is not empty
    if (!img) {
      setError("Please select an Image");
      return;
    }

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
    // I guess you could set headers: {"Content-Type": undefined} !!!!!!!!!

    try {
      const response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      setError(null);
      setTitle("");
      setSubtitle("");
      setImg("");
      setContent("");

      if (isEditing) {
        dispatch({ type: "EDIT_ARTICLE", payload: json });
      } else {
        dispatch({ type: "CREATE_ARTICLE", payload: json });
      }

      // redirect to home page
      navigate("/my");
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong.");
    }
  };

  const quillConfig = {
    // other options
    preserveWhitespace: true,
  };

  return (
    <Box color={theme.palette.mode === "dark" ? "#f5f5f5" : "#323232"}>
      <form
        encType="multipart/form-data"
        className="create"
        onSubmit={handleSubmit}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          New Article
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{ margin: "1rem 0 1rem 0" }}
        />
        <TextField
          required
          id="outlined-required"
          label="Subtitle"
          onChange={(e) => setSubtitle(e.target.value)}
          value={subtitle}
          sx={{ margin: "1rem 0 1rem 0" }}
        />
        <InputLabel htmlFor="image-input">
          {isEditing && img
            ? `Image already uploaded: ${img}`
            : "Choose an image :"}
        </InputLabel>
        <Input
          id="image-input"
          type="file"
          accept="image/*"
          disableUnderline
          onChange={handleImageChange}
          name="uploadFile"
          sx={{ marginBottom: "1rem" }}
        />
        <div className="text-area-parent">
          <div className="react-quill-wrapper">
            <ReactQuill
              className="react-quill"
              theme="snow"
              value={content}
              onChange={setContent}
              style={{ height: "400px", width: "700px" }}
              config={quillConfig}
              preserveWhitespace={true}
            />
          </div>
        </div>

        <button>{isEditing ? "Edit" : "Publish"}</button>
        {error && (
          <Alert severity="warning" sx={{ marginTop: "1rem" }}>
            <AlertTitle>Warning</AlertTitle>
            <strong>{error}</strong>
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default ArticleForm;
