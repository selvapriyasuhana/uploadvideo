// // routes/index.js
// const express = require('express');
// const router = express.Router();
// const { handleVideoUpload } = require('../Controller/Controller.js');

// router.post('/upload', handleVideoUpload);

// module.exports = router;
const router = require("express").Router();

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const AWS = require('aws-sdk');
const mime = require('mime-types');
const Video = require("../Model/model.js");
require('dotenv').config();

const s3 = new AWS.S3({
    region: 'US East (N. Virginia) ',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    endpoint: 'https://s3.amazonaws.com',
    httpOptions: {
        timeout: 300000, // 300 seconds (adjust as needed)
    },
});

const staffUploadsFolder = path.join('uploads', 'videos');
if (!fs.existsSync(staffUploadsFolder)) {
    fs.mkdirSync(staffUploadsFolder, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, staffUploadsFolder);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single('video'), async (req, res) => {
    try {
        if (!req.file || path.extname(req.file.originalname).toLowerCase() !== '.mp4') {
            return res.status(400).json({ message: 'A video file (MP4 format) is required.' });
        }

        const fileContent = fs.readFileSync(req.file.path);

        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const contentType = mime.lookup(fileExtension) || 'video/mp4';
       
        const params = {
            
            Bucket: 'elonleave2023', // Replace with your bucket name
            Key: `videos/${req.file.filename}`,
            Body: fileContent,
            ContentType: contentType,
        };
        
        const s3UploadResponse = await s3.upload(params).promise();
        console.log('S3 Upload Response:', s3UploadResponse);  
        const s3BucketUrl = `https://elonleave2023.s3.amazonaws.com`; // Replace with your S3 bucket URL
        const filePath = `videos/${req.file.filename}`;
        const videoUrl = `${s3BucketUrl}/${filePath}`;
         // Save video information to the database
        const newVideo = new Video({
            videoUrl: videoUrl,
        });

        const savedVideo = await newVideo.save();
        res.header('Content-Type', 'application/json');
         console.log('Video uploaded successfully. Video ID:', savedVideo._id);

        return res.status(200).json({
            message: 'Video uploaded successfully.',
            videoUrl: videoUrl,
            videoId: savedVideo._id, 

        });
       
    } catch (error) {
        console.error('Error during video upload:', error);
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
        });
    }
});

module.exports = router;