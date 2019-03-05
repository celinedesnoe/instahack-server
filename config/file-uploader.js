const cloudinary = require("cloudinary");

const cloudinaryStorage = require("multer-storage-cloudinary");

const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
  cloudinary,
  // will save in the folder in ironphones in our cloudinary account
  folder: "instahack"
  // in case you want to upload files OTHER than images
  // params: {
  //   resource_type: "raw"
  // }
});

// "multer" creates uploader objects that integrate with Express routes
// uploader objects allow routes to receive files
const fileUploader = multer({ storage });

module.exports = fileUploader;
