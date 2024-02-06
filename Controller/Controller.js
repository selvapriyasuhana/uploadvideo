const VideoService = require('../Service/Service.js');
const VideoDao = require('../DAO/Dao.js');

exports.uploadVideo = async (req, res) => {
    try {
        const videoData = await VideoService.uploadVideo(req.file);
        return res.status(200).json(videoData);
    } catch (error) {
        console.error('Error during video upload:', error);
        return res.status(500).json({
            message: 'An error occurred',
            error: error.message,
        });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await VideoDao.getAllVideos();
        return res.status(200).json({
            status: 'Success',
            message: 'All videos retrieved successfully',
            //data: videos,
            videos: videos,
        });
    } catch (error) {
        console.error('Error getting videos:', error);
        return res.status(500).json({
            status: 'Error',
            message: error.message,
        });
    }
};

exports.getVideoById = async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await VideoDao.getVideoById(videoId);

        if (!video) {
            return res.status(404).json({
                status: 'Error',
                message: 'Video not found',
            });
        }
        const videoData = {
            videoId: video._id,
            videoUrl: video.videoUrl,
            uploadedAt: video.uploadedAt,
        };

        return res.status(200).json({
            status: 'Success',
            message: 'Video retrieved successfully',
            //data: video,
            video: videoData,
        });
    } catch (error) {
        console.error('Error getting video by ID:', error);
        return res.status(500).json({
            status: 'Error',
            message: error.message,
        });
    }
};



exports.deleteVideo = async (req, res) => {
    try {
        const videoId = req.params.id;
        const deletedVideo = await VideoDao.deleteVideo(videoId);

        if (!deletedVideo) {
            return res.status(404).json({
                status: 'Error',
                message: 'Video not found',
            });
        }
        const videoData = {
            videoId: deletedVideo._id,
            videoUrl: deletedVideo.videoUrl,
            uploadedAt: deletedVideo.uploadedAt,
        };

        return res.status(200).json({
            status: 'Success',
            message: 'Video deleted successfully',
           // data: deletedVideo,
           deletedVideo: videoData,
        });
    } catch (error) {
        console.error('Error deleting video:', error);
        return res.status(500).json({
            status: 'Error',
            message: error.message,
        });
    }
};
