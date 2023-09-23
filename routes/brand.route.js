const express = require("express");
const brandController = require("../controllers/brand.controller");

const router = express.Router();

router.route("/")
  .post(brandController.createBrand)
  .get(brandController.getBrands);

router.route("/:slug")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrand);


module.exports = router;