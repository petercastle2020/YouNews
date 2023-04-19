const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: function () {
        console.log(this.email);
        const name = this.email.split("@")[0];
        const randomStr = Math.random().toString(36).slice(-6);
        return name + "-" + randomStr;
      },
      unique: true,
    },
    handle: {
      type: String,
      default: function () {
        const handle = "@" + this.name;
        const randomStr = Math.random().toString(36).slice(-6);
        return handle + "-" + randomStr;
      },
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dqjwxv8ck/image/upload/v1681943748/user-default_pawzoi.webp",
    },
  },
  {
    timestamps: true,
  }
);

// static signup method
userSchema.statics.signup = async function (email, password, confirmPassword) {
  // validation
  if (!email || !password || !confirmPassword) {
    throw Error("All fields must be filled.");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use.");
  }

  // bcrypt genSalt & Hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email: email, password: hash });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email: email });

  if (!user) {
    throw Error("It doesn't exist on database.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
