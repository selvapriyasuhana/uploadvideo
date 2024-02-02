// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const dotenv = require('dotenv');
// const fs = require('fs');

// dotenv.config();

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const s3 = new aws.S3();

// const fileFilter = (req, file, cb) => {
//   // Check file type, e.g., allow only videos
//   if (file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type. Only videos are allowed.'));
//   }
// };

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_S3_BUCKET_NAME,
//     acl: 'public-read',
//     key: function (req, file, cb) {
//       const category = 'educational';
//       const key = `videos/${category}/${Date.now().toString()}-${file.originalname}`;
//       console.log('Generating S3 key:', key);
//       cb(null, key);
//     },
//   }),
//   fileFilter: fileFilter,
// });

// module.exports = { upload };
