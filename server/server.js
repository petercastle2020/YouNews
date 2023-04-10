require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const articleRoutes = require("./routes/articles");
const userRoutes = require("./routes/user");
const searchRoutes = require("./routes/search");
const likeRoutes = require("./routes/like");

// express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/articles", articleRoutes);

app.use("/api/user", userRoutes);

app.use("/api/searchData", searchRoutes);

app.use("/api/like", likeRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("db connected & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
