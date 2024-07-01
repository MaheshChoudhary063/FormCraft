const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    image: { type: String },
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema, "Images");
module.exports = Image;
