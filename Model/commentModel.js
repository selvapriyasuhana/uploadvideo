const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Logindetails',
        required: true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploadVideo',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
