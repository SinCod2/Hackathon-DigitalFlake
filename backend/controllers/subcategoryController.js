const Subcategory = require("../models/Subcategory");

// @desc    Get all subcategories
// @route   GET /api/subcategories
// @access  Private
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category", "categoryName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: subcategories.length,
      data: subcategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching subcategories",
      error: error.message,
    });
  }
};

// @desc    Create subcategory
// @route   POST /api/subcategories
// @access  Private
exports.createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, category, image, status } = req.body;

    const subcategory = await Subcategory.create({
      subcategoryName,
      category,
      image,
      status,
    });

    const populatedSubcategory = await Subcategory.findById(
      subcategory._id
    ).populate("category", "categoryName");

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: populatedSubcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating subcategory",
      error: error.message,
    });
  }
};

// @desc    Update subcategory
// @route   PUT /api/subcategories/:id
// @access  Private
exports.updateSubcategory = async (req, res) => {
  try {
    const { subcategoryName, category, image, status } = req.body;

    const subcategory = await Subcategory.findByIdAndUpdate(
      req.params.id,
      { subcategoryName, category, image, status },
      { new: true, runValidators: true }
    ).populate("category", "categoryName");

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating subcategory",
      error: error.message,
    });
  }
};

// @desc    Delete subcategory
// @route   DELETE /api/subcategories/:id
// @access  Private
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subcategory",
      error: error.message,
    });
  }
};
