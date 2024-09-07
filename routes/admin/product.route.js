const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validate/admin/product.validate");
router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMultiStatus);
router.delete("/delete/:id", controller.deleteItem);

router.get("/create", controller.create);
router.post("/create",validate.createPost, controller.createPost);

router.get("/edit/:id",controller.edit);
router.put("/edit/:id",validate.createPost, controller.editPut);

router.get("/detail/:id",controller.detail);
module.exports = router;