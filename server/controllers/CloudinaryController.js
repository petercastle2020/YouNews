require("dotenv").config();
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Upload IMG Cloudinary
const uploadIMG = async (imgPath) => {
  // Cloudinary uploader and return IMG URL with .then
  try {
    const result = await cloudinary.uploader.upload(imgPath);
    //JSON.stringify will provide a formatted string
    //1st param is the value to be output
    //2st param null is a function that can be applied to the output
    //3st param is the number of space characters to use for whitespace in formatting the output
    console.log("success", JSON.stringify(result, null, 2));
    img = result.secure_url;
    //Deleting from Img from assets once it is uploaded.
    //get file name
    const imgName = result.original_filename;
    fs.unlink("assets/" + imgName, (error) => {
      if (error) {
        throw error;
      }

      console.log("Deleted files from server placeholder successfully.");
    });
    return img;
  } catch (error) {
    console.log("error", JSON.stringify(error, null, 2));
    throw new Error("Failed to upload image to Cloudinary.");
  }
};

//Delete IMG Cloudinary.
const deleteIMG = (imageURL) => {
  return new Promise((resolve, reject) => {
    const url = imageURL;
    const publicId = url.substring(
      url.lastIndexOf("/") + 1,
      url.lastIndexOf(".")
    );
    // https://res.cloudinary.com/dqjwxv8ck/image/upload/v1680977690/h8qciuuhzrbpzeuzlhyf.webp
    /* url.lastIndexOf("/") + 1, url.lastIndexOf(".")
  takes the substring variable, starting at the index of the
  character after the last forward slash
  and ending at the index of the last period character. */
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.log("Error deleting image:", error.message);
        reject(error);
        return;
      }
      console.log("Image deleted successfully", result);
      resolve(result.secure_url);
    });
  });
};

module.exports = { uploadIMG, deleteIMG };
