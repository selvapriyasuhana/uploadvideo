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
     console.log('Request Body:', req.body);
  console.log('Request File:', req.file);
    try {
        if (!req.file || path.extname(req.file.originalname).toLowerCase() !== '.mp4') {
            return res.status(400).json({ message: 'A video file (MP4 format) is required.' });
        }

        const fileContent = fs.readFileSync(req.file.path);

        const fileExtension = path.extname(req.file.originalname).toLowerCase();
        const contentType = mime.lookup(fileExtension) || 'video/mp4';
       
        const params = {
            
            Bucket: 'elonleave2023', 
            Key: `videos/${req.file.filename}`,
            Body: fileContent,
            ContentType: contentType,
        };
        
        const s3UploadResponse = await s3.upload(params).promise();
        console.log('S3 Upload Response:', s3UploadResponse);  
        const s3BucketUrl = `https://elonleave2023.s3.amazonaws.com`; 
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
router.post('/register', async (req, res) => {
    const { mobileNumber } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ mobileNumber });
  
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({ mobileNumber });
      await newUser.save();
  
      // Return success message
      return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });
  
router.post('/login', async (req, res) => {
    const { mobileNumber } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ mobileNumber });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return success message
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  });
  
var videocontroller = require("../Controller/Controller.js");
router.route("/getall").get(videocontroller.getAllVideos);

router
  .route("/videos/:id")
  .get(videocontroller.getVideoById)
  .delete(videocontroller.deleteVideo);



module.exports = router;
