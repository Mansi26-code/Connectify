const router = require("express").Router();
const Post=require("../models/Post")
const User= require("../models/User")


//create a post

router.post("/" ,async(req,res)=>{
    const newPost= new Post(req.body);

    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err)
    {
        res.status(500).json(err);
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


router.get("/timeline/all", async (req, res) => {
    try {
        let currentUser = await User.findById(req.body.userId);
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
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});




module.exports = router;
