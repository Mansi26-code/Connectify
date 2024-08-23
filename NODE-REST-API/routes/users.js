const User=require("../models/User");
const router=require("express").Router();
const bcrypt=require("bcrypt");

// Update user
router.put("/:id", async (req, res) => {
    console.log("Update user route hit"); // Debug logging
    const userId = req.body.userId;
    const paramsId = req.params.id;

    if (userId === paramsId || req.body.isAdmin) {
        console.log("Authorized user"); // Debug logging
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                console.error("Error hashing password:", err); // Debug logging
                return res.status(500).json({ error: 'Error hashing password', details: err });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(paramsId, { $set: req.body }, { new: true });
            if (!user) {
                return res.status(404).json("User not found");
            }
            console.log("User updated successfully"); // Debug logging
            res.status(200).json("Account has been updated");
        } catch (err) {
            console.error("Error updating user:", err); // Debug logging
            return res.status(500).json({ error: 'Error updating user', details: err });
        }
    } else {
        console.log("Unauthorized user"); // Debug logging
        return res.status(403).json("You can update only your account");
    }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json("User not found");
        }
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.forEach(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    console.log("Delete user route hit"); // Debug logging
    const userId = req.body.userId;
    const paramsId = req.params.id;

    if (userId === paramsId || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(paramsId);
            if (!user) {
                return res.status(404).json("User not found");
            }
            console.log("User deleted successfully"); // Debug logging
            res.status(200).json("Account has been deleted successfully");
        } catch (err) {
            console.error("Error deleting user:", err); // Debug logging
            return res.status(500).json({ error: 'Error deleting user', details: err });
        }
    } else {
        console.log("Unauthorized user"); // Debug logging
        return res.status(403).json("You can delete only your account");
    }
});

// Get a user
router.get("/:id", async (req, res) => {
    try{
        const user=await User.findById(req.params.id);
        const {password,updatedAt, ...other}=user._doc;//to not show extra infos like password and updated at
        res.status(200).json(other);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});

// Follow a user
router.put("/:id/follow", async (req, res) => {
    console.log("Follow route hit with params:", req.params, "and body:", req.body);
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            
            if (!user) {
                console.log("User to be followed not found:", req.params.id);
                return res.status(404).json("User not found");
            }
            if (!currentUser) {
                console.log("Current user not found:", req.body.userId);
                return res.status(404).json("Current user not found");
            }

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                console.log("User has been followed successfully");
                return res.status(200).json("User has been followed");
            } else {
                console.log("User is already followed");
                return res.status(403).json("You already follow this user");
            }
        } catch (err) {
            console.error("Error following user:", err);
            return res.status(500).json(err);
        }
    } else {
        console.log("Attempt to follow self");
        return res.status(403).json("You can't follow yourself");
    }
});


// Unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(404).json("User not found");
            }

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("User has been unfollowed");
            } else {
                return res.status(403).json("You don't follow this user");
            }
        } catch (err) {
            console.error("Error unfollowing user:", err); // Debug logging
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can't unfollow yourself");
    }
});
 

module.exports=router
