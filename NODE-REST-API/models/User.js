const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Corrected spelling
        minlength: 3, // Updated for better readability
        maxlength: 20, // Updated for better readability
        unique: true
    },
    email: {
        type: String,
        required: true, // Corrected spelling
        minlength: 8, // Updated for better readability
        maxlength: 40, // Updated for better readability
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Updated for better readability
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false // Corrected spelling
    },
    desc: {
        type: String,
        maxlength: 50 // Updated for better readability
    },
    city: {
        type: String,
        maxlength: 50 // Updated for better readability
    },
    from: {
        type: String,
        maxlength: 50 // Updated for better readability
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }          
}, 
{ timestamps: true });

module.exports = mongoose.model("User", UserSchema);
