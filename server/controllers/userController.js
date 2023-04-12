const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWT_SECRET, { expiresIn: "90d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create jwt token.
    const token = createToken(user._id);
    res.status(200).json({
      email: user.email,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
      joinedAt: user.createdAt,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// signup user
const signupUser = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    const user = await User.signup(email, password, confirmPassword);

    // create jwt token.
    const token = createToken(user._id);

    res.status(200).json({
      email: user.email,
      name: user.name,
      handle: user.handle,
      avatar: user.avatar,
      joinedAt: user.createdAt,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get user data using :id
const getUserById = async (req, res) => {
  const user_id = req.params.id;

  try {
    const user = await User.findOne({ _id: user_id });
    res.status(200).json({ user_id: user._id, user_email: user.email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// const update = async (req, res) => {
//   meu = "63e92529db245d6610ae66dd";
//   pic =
//     "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp";

//   date = new Date();
//   const user = await User.findOneAndUpdate(
//     { _id: meu },
//     {
//       avatar: pic,
//       name: "Peter Castle",
//       handle: "@petercastle",
//       createdAt: date,
//     }
//   );
// };

// update();

module.exports = {
  loginUser,
  signupUser,
  getUserById,
};
