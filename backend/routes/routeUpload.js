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
    {storage: multer.memoryStorage(),
     limits: {fileSize: 1024 * 1024},
    fileFilter: function(req, file, cb){
        checkImageType(file, cb)
    }
    })

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename(req, file, cb) {
//         cb(
//             null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//         );
//     },
// });

// function fileFilter(req, file, cb) {
//     const filetypes = /jpe?g|png|webp/;
//     const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = mimetypes.test(file.mimetype);

//     if (extname && mimetype) {
//         cb(null, true);
//     } else {
//         cb(new Error('Images only!'), false);
//     }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single('image');

// router.post('/', (req, res) => {
//     uploadSingleImage(req, res, function (err) {
//         if (err) {
//             res.status(400).send({ message: err.message });
//         }

//         res.status(200).send({
//             message: 'Image uploaded successfully',
//             image: `/${req.file.path}`,
//         });
//     });
// });

router.route("/").patch(upload.single("logo"), async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({message: "No file uploaded"})
        }
        const result = await cloudinaryUploader(req.file.buffer, req.file.originalname)
        res.send(result)
    } catch (error) {
               console.error("Error uploading to Cloudinary:", error);
                res.status(500).send("Error uploading file");
    }
})

module.exports = router;