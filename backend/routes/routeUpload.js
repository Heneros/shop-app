const path = require("path");
const express = require("express");
const multer = require("multer");
const cloudinaryUploader = require("../config/cloudinaryConfig");


const router = express.Router();



function checkImageType(file, cb) {
  // console.log('Checking file:', file.originalname, 'MIME type:', file.mimetype);

  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Unsupported file format. You can only upload jpeg, jpg and png");
  }
}


const upload = multer(
  {
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 },
    fileFilter: function (req, file, cb) {
      checkImageType(file, cb)
    }
  })

router.route("/").patch(upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }
    const result = await cloudinaryUploader(req.file.buffer, req.file.originalname)
    return res.json(result)
    /// res.json({ url: result.secure_url, message: "File uploaded successfully" });

  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Error uploading file");
  }
})

module.exports = router;