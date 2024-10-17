import "./share.css";
import { useContext, useRef, useState } from "react";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import { AuthContext } from "../../context/AuthContext";
import instance from "../../axios"; // Importing custom axios instance

export default function Share({ onAddPost }) {
    const { user } = useContext(AuthContext);
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false); // State to handle loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when submitting

        const newPost = {
            userId: user._id,
            desc: desc.current.value, // Use the value of the ref
        };

        try {
            // Handle file upload to Cloudinary if a file is selected
            if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "social_app");
                data.append("cloud_name", "drdtgt2co");

                const uploadRes = await fetch("https://api.cloudinary.com/v1_1/drdtgt2co/image/upload", {
                    method: "POST",
                    body: data,
                });

                if (!uploadRes.ok) {
                    throw new Error("Failed to upload image");
                }

                const fileData = await uploadRes.json();
                console.log("File Upload Response:", fileData);

                newPost.img = fileData.url; // Add image URL to the new post
            }

            // Create the post
            const res = await instance.post("/api/posts", newPost);
            console.log("Post created successfully:", res.data);

            onAddPost(res.data); // Add the new post to the feed

            // Reset form and states after successful post creation
            desc.current.value = ""; 
            setFile(null); 
            setLoading(false);

            alert("Post shared successfully!");
        } catch (err) {
            console.error("Post creation error:", err);
            setLoading(false);
            alert("Failed to share post. Please try again.");
        }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar.webp"} 
                        alt="" 
                    />
                    <input 
                        placeholder={"Share your thoughts " + user.username + "..."} 
                        className="shareInput" 
                        ref={desc} 
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png,.jpg,.jpeg,.webp" 
                                onChange={(e) => setFile(e.target.files[0])} 
                                style={{ display: "none" }} 
                            />
                        </label>

                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="gold" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit" disabled={loading}>
                        {loading ? "Sharing..." : "Share"}
                    </button>
                </form>
            </div>
        </div>
    );
}
