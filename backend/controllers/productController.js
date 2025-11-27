const Product = require("../models/Product");

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "categoryName")
      .populate("subcategory", "subcategoryName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Private
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "categoryName")
      .populate("subcategory", "subcategoryName");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
  try {
    const { productName, category, subcategory, image, status } = req.body;

    const product = await Product.create({
      productName,
      category,
      subcategory,
      image,
      status,
    });

    const populatedProduct = await Product.findById(product._id)
      .populate("category", "categoryName")
      .populate("subcategory", "subcategoryName");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: populatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const { productName, category, subcategory, image, status } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, category, subcategory, image, status },
      { new: true, runValidators: true }
    )
      .populate("category", "categoryName")
      .populate("subcategory", "subcategoryName");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
};
