const express = require("express");
const {
  createForm,
  formsGet,
  getFormById,
  deleteForm,
  editForm,
  getAllFormsOfUser,
  allResponses,
  submitResponse,
  getResponse,
} = require("../controllers/form");

const router = express.Router();

router.post("/create", createForm);
router.get("/forms", formsGet);
router.get("/form/:formId", getFormById);
router.delete("/deleteform/:formId/:userId", deleteForm);
router.put("/editform", editForm);
router.get("/getuserforms/:userId", getAllFormsOfUser);
router.post("/addresponse", submitResponse);
router.get("/responses", allResponses);
router.get("/getresponse/:formId", getResponse);

module.exports = router;
