const express = require("express");
const { protect } = require("../middleware/auth");
const {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getSubcategories).post(createSubcategory);

router.route("/:id").put(updateSubcategory).delete(deleteSubcategory);

module.exports = router;
