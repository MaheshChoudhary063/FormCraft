const express = require("express");
const { loginGet, login } = require("../controllers/user");

const router = express.Router();

router.get("/login", loginGet);
router.post("/login", login);

module.exports = router;
