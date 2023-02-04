const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a contact category"],
  },
});

module.exports = mongoose.model("Category", CategorySchema);
