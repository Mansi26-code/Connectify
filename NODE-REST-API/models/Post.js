const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true, // Corrected spelling
       
    },
   
    desc: {
        type: String,
        maxlength: 500 // Updated for better readability
    },
    img:{
       type:String,
    },
    likes:{
        type:Array,
        default:[]
    },
   
}, 
{ timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
