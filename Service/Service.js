const Dao = require('../DAO/Dao.js');

const getAllVideos = async () => {
    try {
        const videos = await Dao.getAllVideos();
        return videos;
    } catch (error) {
        throw error;
    }
};

const getVideoById = async (videoId) => {
    try {
        const video = await Dao.getVideoById(videoId);
        return video;
    } catch (error) {
        throw error;
    }
};

const addVideo = async (videoData) => {
    try {
        const newVideo = await Dao.addVideo(videoData);
        return newVideo;
    } catch (error) {
        throw error;
    }
};

const updateVideo = async (videoId, updatedData) => {
    try {
        const updatedVideo = await Dao.updateVideo(videoId, updatedData);
        return updatedVideo;
    } catch (error) {
        throw error;
    }
};

const deleteVideo = async (videoId) => {
    try {
        const deletedVideo = await Dao.deleteVideo(videoId);
        return deletedVideo;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllVideos,
    getVideoById,
    addVideo,
    updateVideo,
    deleteVideo,
};
