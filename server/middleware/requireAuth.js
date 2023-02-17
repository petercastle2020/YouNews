const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required." });
  }

  // Authorization eg. "Bearer fjjjsfjdsf.jsfjsfjdsfljsdfljslf.jlsfjslfj"

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id user_email");
    console.log(req.user);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized." });
  }
};

module.exports = requireAuth;
