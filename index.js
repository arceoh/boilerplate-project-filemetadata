var express = require("express");
var cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv").config();

var app = express();
app.use(fileUpload());

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  let upFile;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  upFile = req.files.upfile;

  console.log("UPFILE: ", req.files.upfile);

  res.json({
    name: upFile.name,
    type: upFile.mimetype,
    size: upFile.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
