const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    createdForms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema, "Users");
module.exports = User;
