const express = require("express");
const { protect } = require("../middleware/auth");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
