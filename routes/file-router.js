const express = require("express");
const fileUploader = require("../config/file-uploader.js");
const router = expres.Router();

router.post(
  "/single-upload",
  fileUploader.single("userFile"),
  (req, res, next) => {
    console.log("New File Upload", req.file);
    if (!req.file) {
      next(new Error("No file uploaded"));
      return;
    }
    const { originalname, secure_url, format, width, height } = req.file;
    res.json({
      fileName: originalname,
      fileUrl: secure_url,
      format,
      width,
      height
    });
  }
);
