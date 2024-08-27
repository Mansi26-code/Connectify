import React, { useState, useEffect } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import './feed.css';
import axios from "axios";

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState(""); // Missing text state

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const url = username 
                    ? `http://localhost:8800/api/posts/profile/${username}` 
                    : "http://localhost:8800/api/posts/timeline/66c0e098333d653454f008bd";
                console.log("Fetching URL:", url);
                const res = await axios.get(url);
                console.log("Response Status:", res.status);
                console.log("Response Data:", res.data);
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        fetchPosts();
    }, [username]);

    return (
        <div className="feed">
            <input 
                type="text" 
                value={text} 
                onChange={e => setText(e.target.value)}
            />
            <div className="feedWrapper">
                <Share />
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}



