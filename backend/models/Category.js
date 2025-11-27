const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please provide a category name"],
    trim: true,
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
categorySchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

module.exports = mongoose.model("Category", categorySchema);
