const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  subcategoryName: {
    type: String,
    required: [true, "Please provide a subcategory name"],
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please select a category"],
  },
  image: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on modification
subcategorySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
