const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { uploadIMG, deleteIMG } = require("./CloudinaryController");

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
// UPDATE User Avatar
// const updateUserAvatar = async (req, res) => {
//   try {
//     const imgPath = req.file.path; // middleware multer
//     const newAvatar = await uploadIMG(imgPath);
//     res.status(200).json({ newAvatar });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to upload image." });
//   }
// };

// UPDATE User Avatar
const updateUserAvatar = async (req, res) => {
  try {
    console.log("IMG FILE:", req.file.path);
    console.log("DELETE URL:", req.body.deleteURL);
    const imgPath = req.file.path; // middleware multer
    const deleteURL = req.body.deleteURL; // URL to be deleted.
    const newAvatar = await uploadIMG(imgPath);
    // delete only after new Avatar is true.
    const deletedAvatar = await deleteIMG(deleteURL);

    res.status(200).json({ newAvatar, deletedAvatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload image." });
  }
};

// DELETE User avatar
const deleteUserAvatar = async (req, res) => {
  try {
    // URL to be deleted.
    const imgURL = req.body.imgURL;
    const deletedAvatar = await deleteIMG(imgURL);
    res.status(200).json({ deletedAvatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete image." });
  }
};

// PATCH USER DOC

const updateUser = async (req, res) => {
  console.log("updateUser fucntion called in the controller.");
  console.log(req.user._id);

  try {
    // User _id from middleware Auth.
    const user_id = req.user._id;
    // changes
    const updates = req.body;
    console.log(updates);

    const user = await User.findByIdAndUpdate(
      user_id,
      {
        ...updates,
      },
      { new: true }
    ).select("_id avatar name email handle token");

    if (user) {
      console.log({ user });
      res.status(200).json({ user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

// const update = async (req, res) => {
//   meu = "63e92529db245d6610ae66dd";
//   pic =
//     "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1681591697/a8jmvalqzltblxmkuvt1.webp";

//   date = new Date();
//   const user = await User.findOneAndUpdate(
//     { _id: meu },
//     {
//       avatar: pic,
//     }
//   );

//   if (user) {
//     console.log("IMG UPDATED>");
//   }
// };

// update();

module.exports = {
  loginUser,
  signupUser,
  getUserById,
  updateUserAvatar,
  deleteUserAvatar,
  updateUser,
};
