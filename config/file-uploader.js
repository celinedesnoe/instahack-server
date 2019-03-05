const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.eventNames.CLOUDINARY_NAME,
  api_key: process.eventNames.CLOUDINARY_KEY,
  api_secret: process.eventNames.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: "instahack"
});

const fileUploader = multer({ storage });

module.exports = fileUploader;
