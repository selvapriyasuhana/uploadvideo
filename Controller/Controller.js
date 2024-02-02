// const { upload } = require('../Service/Service.js');
// const { saveVideo } = require('../DAO/Dao.js');

// const uploadVideo = upload.single('video');

// const handleVideoUpload = (req, res) => {
//   uploadVideo(req, res, async function (err) {
//     if (err) {
//       console.error('Error during file upload:', err);
//       return res.status(500).json({ error: err.message });
//     }

//     const { title, description } = req.body;
//     const videoUrl = req.file.location;

//     try {
//       const savedVideo = await saveVideo(title, description, videoUrl);
//       res.status(201).json(savedVideo);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

// module.exports = { handleVideoUpload };
