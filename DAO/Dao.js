const Video = require('../Model/model.js');

exports.getAllVideos = async () => {
    try {
        return await Video.find();
    } catch (error) {
        throw error;
    }
};

exports.getVideoById = async (videoId) => {
    try {
        return await Video.findById(videoId);
    } catch (error) {
        throw error;
    }
};

exports.addVideo = async (videoData) => {
    try {
        const newVideo = new Video(videoData);
        return await newVideo.save();
    } catch (error) {
        throw error;
    }
};



exports.deleteVideo = async (videoId) => {
    try {
        return await Video.findByIdAndDelete(videoId);
    } catch (error) {
        throw error;
    }
};


