const express = require("express");

const fileUploader = require("../config/file-uploader.js");

const router = express.Router();

var cloudinary = require("cloudinary");

// in single() what the front end send
router.post(
  "/single-upload",
  fileUploader.single("userFile"),
  (req, res, next) => {
    // multer puts all the information about the uploaded in req.file
    console.log("New File UPLOAD", req.file);

    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    const { orginalname, secure_url, format, width, height } = req.file;

    res.json({
      fileName: orginalname,
      fileUrl: secure_url,
      format,
      width,
      height
    });
  }
);

// in single() what the front end send
// router.post("/filter-upload", (req, res, next) => {
//   var src = req.body;

//   cloudinary.v2.uploader.upload(src, function(error, result) {
//     console.log(result, error);
//   });

// cloudinary.uploader.upload(src, function(result) {
//   console.log(result);
// });

// cloudinary.v2.uploader.upload(
//   uploadPic,
//   {
//     overwrite: true,
//     invalidate: true,
//     width: 810,
//     height: 456,
//     crop: "fill"
//   },
//   function(error, result) {
//     res.json(result);
//   }
// );

// multer puts all the information about the uploaded in req.file
//   console.log("New File UPLOAD", req.file);
//   console.log("REQ.BODY", req.body);
//   const { orginalname, secure_url, format, width, height } = req.file;

//   res.json({
//     fileName: orginalname,
//     fileUrl: secure_url,
//     format,
//     width,
//     height
//   });
// });

module.exports = router;
