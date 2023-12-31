const express = require("express");
const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.route("/")
    .post(categoryController.createCategory)
    .get(categoryController.getCategory);

router.route("/:slug")
    .get(categoryController.getCategoryById)
    .patch(categoryController.updateCategory);


module.exports = router;