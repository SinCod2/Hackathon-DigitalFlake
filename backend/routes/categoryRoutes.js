const express = require("express");
const { protect } = require("../middleware/auth");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getCategories).post(createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
