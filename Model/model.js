// // models/videoModel.js
// // const mongoose = require('mongoose');

// const videoSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String },
//   url: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Video = mongoose.model('s3bucket', videoSchema);

// module.exports = Video;
// VideoModel.js

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  
  videoUrl: { type: String, required: true }, // URL of the uploaded video on S3
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the video was uploaded
  
});

const Video = mongoose.model("uploadVideo", videoSchema);

module.exports = Video;
