const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
    userId: {
      type: String,
    },
    response: [
      {
        questionId: String,
        optionId: String,
      },
    ],
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", ResponseSchema, "Responses");
module.exports = Response;
