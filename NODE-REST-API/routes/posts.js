const router = require("express").Router();
const Post=require("../models/Post")
const User= require("../models/User")


//create a post


router.get("/profile/username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        
        if (!user) {
            return res.status(404).json("User not found");
        }
        

        // Ensure userId field is of the correct type if necessary
        const posts = await Post.find({ userId: user._id });
        
        console.log(posts); // Ensure this logs correctly
        res.status(200).json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err); // More descriptive error message
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


//update
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id); // Await the asynchronous operation

        if (!post) {
            return res.status(404).json("Post not found");
        }

        console.log("Post id : ", post.userId);
        console.log("User id : ", req.body.userId);

        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Your post is updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE

router.delete("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id); // Await the asynchronous operation

        if (!post) {
            return res.status(404).json("Post not found");
        }

        console.log("Post id : ", post.userId);
        console.log("User id : ", req.body.userId);

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Your post has been Deleted");
        } else {
            res.status(403).json("You can Delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//LIKE

router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET A POST

router.get("/:id", async(req,res)=>{
    try{
    const post= await Post.findById(req.params.id);
    res.status(200).json(post);
}
catch(err){
    res.status(500).json(err)
}
});

// get Timeline posts


router.get("/timeline/:userId", async (req, res) => {
    try {
        let currentUser = await User.findById(req.params.userId);
        if (!currentUser) {
            return res.status(404).json("User not found");
        }
        let userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        console.log(userPosts);
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.log(err);  
        res.status(500).json(err);
    }
});


//get user's all posts
// get user's all posts
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json("User not found");
        }

        const posts = await Post.find({ userId: user._id });
        console.log(posts);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
