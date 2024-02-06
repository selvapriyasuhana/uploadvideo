const express = require('express');
const router = express.Router();
const Comment = require('../Model/commentModel.js');
const Reply = require('../Model/replyModel.js');
const Video = require("../Model/model.js");
const User =require ("../Model/Usermodel.js")

// Route for creating a new comment
router.post('/comments', async (req, res) => {
    try {
        const { userId, videoId, content } = req.body;
        const comment = new Comment({ userId, videoId, content });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for creating a new reply to a comment
router.post('/replies/:commentId', async (req, res) => {
    try {
        const { userId, content } = req.body;
        const { commentId } = req.params;

        // Check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Create the reply
        const reply = new Reply({ userId, commentId, content });
        await reply.save();

        // Update the comment with the new reply
        comment.replies.push(reply._id);
        await comment.save();

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for getting all comments
router.get('/comments', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for getting all replies for a specific comment
router.get('/comments/:commentId/replies', async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId).populate('replies');
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.json(comment.replies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/videos/comments/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;
        const comments = await Comment.find({ videoId }).populate('replies');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
