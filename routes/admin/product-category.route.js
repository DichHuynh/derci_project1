const express = require("express");
const route = express.Router();
const multer = require("multer");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.api_secret
});

const upload = multer();
const middleware = require("../../middlewares/admin/upload.middleware");
const controller = require("../../controllers/admin/product-category.controller.js");

route.get("/", controller.index);
route.get("/create", controller.create);
route.post("/create",
  upload.single("thumbnail"),
  middleware.uploadFile,
  controller.createPost);
route.patch("/change-status/:status/:id", controller.changeStatus);
route.get("/edit/:id", controller.edit);
route.put("/edit/:id", 
  upload.single("thumbnail"),
  middleware.uploadFile, 
  controller.editPut);

module.exports = route;