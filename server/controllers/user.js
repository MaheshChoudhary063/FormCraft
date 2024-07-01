const User = require("../models/User");
const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_SECRET = "mahesh";

const loginGet = async (req, res) => {
  try {
    const result = await User.find().lean();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const login = async (req, res) => {
  try {
    const result = await User.findOne({ email: req.body.email }).lean();

    if (!result) {
      const gData = {
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      };

      const newUser = new User(gData);
      const docs = await newUser.save();

      const user = {
        id: docs._id,
        name: docs.name,
        email: docs.email,
        image: docs.image,
      };

      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({
        accessToken,
      });
    } else {
      const user = {
        id: result._id,
        name: result.name,
        email: result.email,
        image: result.image,
      };

      const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });

      res.status(200).json({
        accessToken,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { loginGet, login };