const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.api_secret
});
const upload = multer();
const middleware = require("../../middlewares/admin/upload.middleware");
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validate/admin/product.validate");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMultiStatus);
router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);
router.post("/create",
  upload.single("thumbnail"),
  middleware.uploadFile,
  // thêm middleware upload ảnh sản phẩm
  // function (req, res, next) {
    // if (req.file) {
    //   let streamUpload = (req) => {
    //     return new Promise((resolve, reject) => {
    //       let stream = cloudinary.uploader.upload_stream(
    //         (error, result) => {
    //           if (result) {
    //             resolve(result);
    //           } else {
    //             reject(error);
    //           }
    //         }
    //       );

    //       streamifier.createReadStream(req.file.buffer).pipe(stream);
    //     });
    //   };

    //   async function upload(req) {
    //     let result = await streamUpload(req);
    //     console.log(result);
    //     req.body[req.file.fieldname] = result.secure_url;
    //     next();
    //   }
    //   upload(req);
    // }else{
    //   next();
    // }
  // },
  validate.createPost,
  controller.createPost);

router.get("/edit/:id", controller.edit);
router.put("/edit/:id", validate.createPost, controller.editPut);

router.get("/detail/:id", controller.detail);
module.exports = router;