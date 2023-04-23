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
      createdAt: user.createdAt,
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
      createdAt: user.createdAt,
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
    const user = await User.findOne({ _id: user_id }).select(
      "_id avatar name handle createdAt"
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPDATE User
const updateUser = async (req, res) => {
  try {
    const user_id = req.user._id; // User _id from middleware Auth.
    const deleteURL = req.body.deleteURL; // URL to be deleted.
    const { name, email, handle } = req.body;
    let newAvatar;
    let imgPath;
    // check to see File exists.
    if (req.file) {
      imgPath = req.file.path; // middleware multer
    }
    const userToUpdate = {}; // user changes to be updated.

    // UPLOAD new avatar

    try {
      if (imgPath) {
        newAvatar = await uploadIMG(imgPath);
        userToUpdate.avatar = newAvatar;
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Image upload failed." });
    }

    // UPDATE user
    if (name) {
      userToUpdate.name = name;
    }
    if (email) {
      userToUpdate.email = email;
    }
    if (handle) {
      userToUpdate.handle = handle;
    }

    try {
      const user = await User.findByIdAndUpdate(user_id, userToUpdate, {
        new: true,
      }).select("_id avatar name email handle createdAt token");

      if (user) {
        // Create new JWT token to send back with updated data.
        const newToken = createToken(user._id);
        console.log({ ...user, newToken });
        res.status(200).json({ user: { ...user.toObject(), token: newToken } });
      }
    } catch (error) {
      console.error(error);
      // If upload fails, delete the avatar uploaded.
      try {
        await deleteIMG(newAvatar);
      } catch (error) {
        console.error(error);
      }
      res.status(500).json({ error: "User update failed." });
    }

    console.log(deleteURL);
    const defaultAvatarSource =
      "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1681943748/user-default_pawzoi.webp";
    // DELETE old avatar
    if (deleteURL && newAvatar) {
      try {
        if (deleteURL === defaultAvatarSource) {
          return;
        }
        await deleteIMG(deleteURL);
      } catch (error) {
        console.error(error);
        // delete failed, keep new avatar and user
        return res.status(500).json({ error: "Avatar delete failed." });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUserById,
  updateUser,
};
