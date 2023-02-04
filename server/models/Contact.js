const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a contact name"],
    },
    email: { type: String, required: false },
    phoneNumber: {
      type: String,
      required: [true, "Please add a contact phone number"],
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please add a post owner"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please add a contact category"],
    },
  },
  { timestamps: true }
);

ContactSchema.index({ "$**": "text" });

module.exports = mongoose.model("Contact", ContactSchema);
