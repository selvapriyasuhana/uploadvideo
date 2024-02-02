// var express = require("express");
// var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const multer = require('multer');
// const AWS = require('aws-sdk');

// var app = new express();
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// var VideoRoutes = require("./Routes/routes.js");


// var mongodb = require("./Config/Mongoconfig.js");
// dotenv.config();
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.json());

// const mongo = mongoose.connect(mongodb.url);
// mongo.then(
//   () => {
//     console.log("Mongo_DB Connected Successfully");
//   },
//   (error) => {
//     console.log(
//       error,
//       "Error, While connecting to Mongo_DB somthing went wrong"
//     );
//   }
// );

// var port = process.env.PORT||7000;
// app.listen(port, () => {
//   console.log("Server running on port " + port);
// });

// app.get("/", (req, res) => res.send("s3bucket video "));

// app.use("/api", VideoRoutes);


// module.exports = app;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

var app = new express();
var VideoRoutes = require("./Routes/routes.js");

var mongodb = require("./Config/Mongoconfig.js");
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const mongo = mongoose.connect(mongodb.url);
mongo.then(
  () => {
    console.log("Mongo_DB Connected Successfully");
  },
  (error) => {
    console.log(
      error,
      "Error, While connecting to Mongo_DB something went wrong"
    );
  }
);

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});

app.get("/", (req, res) => res.send("s3bucket video "));

app.use("/api", VideoRoutes);

module.exports = app;
