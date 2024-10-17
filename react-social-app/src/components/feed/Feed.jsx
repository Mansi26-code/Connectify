import React, { useState, useEffect, useContext } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import { AuthContext } from '../../context/AuthContext';
import './feed.css';
import axios from 'axios';

export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

    // Fetch posts based on whether a username is provided or the timeline posts for the logged-in user
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const url = username 
                    ? `http://localhost:8800/api/posts/profile/${username}` 
                    : `http://localhost:8800/api/posts/timeline/${user?._id}`;
                console.log("Fetching URL:", url);
                const res = await axios.get(url);
                console.log("Response Status:", res.status);
                console.log("Response Data:", res.data);
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching posts:", err);
            }
        };

        if (user?._id) {
            fetchPosts();
        }
    }, [username, user?._id]);

    // Function to handle adding a new post after submission
    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]); // Add new post to the beginning of the posts array
    };

    return (
        <div className="feed">
            <div className="feedWrapper">
                {/* Pass handleAddPost to the Share component */}
                <Share onAddPost={handleAddPost} /> 
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    );
}

