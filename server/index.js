const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const ImageModel = require("./models/Image");


const userRoute = require("./routes/userRoute");
const formRoute = require("./routes/FormRouter");

const storage = multer.diskStorage({
  destination: "./public",
  filename(req, file, cb) {
    cb(
      null,
      "google-form-content-questions-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });


const dotenv = require("dotenv");

// dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL =
  "mongodb+srv://mahesh63choudhary:0g4vh2ezHuIywlbE@cluster0.6jczz57.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/users", userRoute);
app.use("/form", formRoute);

app.get("/", async (req, res) => {
  try {
    var result = await ImageModel.find().lean();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
});


app.post("/", upload.single("myfile"), async (req, res) => {
  const file = req.file; 
  const meta = req.body; 

  var data = {
    image: req.file.filename,
  };
  var newImage = new ImageModel(data);
  await newImage.save().then((docs) => {
    console.log(docs);
    res.json({
      image: docs.image,
      host: req.protocol + "://" + req.get("host"),
    });
  });
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//0g4vh2ezHuIywlbE

// mongodb+srv://mahesh63choudhary:0g4vh2ezHuIywlbE@cluster0.6jczz57.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
