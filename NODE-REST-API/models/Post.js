const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
 
    desc: {
        type: String,
        maxlength: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: [String], // Better to use an array of strings for user IDs or other data
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);

