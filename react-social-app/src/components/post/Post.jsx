import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { format, render, cancel, register } from 'timeago.js';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom'; // Note the single quotes around the module name


const Post = ({ post }) => {
  // Initialize state for likes and whether the post is liked
  const [like, setLike] = useState(post.likes.length); // Assuming post.likes is an array
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  // Fetch user details when post.userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${post.userId}`);
        console.log('API response:', res.data); // Check the structure of the response
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    

    fetchUser();
  }, [post.userId]);

  // Handler for like button click
  const likeHandler = () => {
    setLike(prevLike => isLiked ? prevLike - 1 : prevLike + 1);
    setIsLiked(!isLiked);
  };




  // Ensure PF and post.img handle missing values gracefully
  const profilePicture = user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/avatar.webp`;
  const postImage = post.img ? `${PF}${post.img}` : `${PF}defaultPostImage.png`; // Provide a default image if post.img is missing

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to ={`profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture ||PF+"person/avatar.webp"}
              alt="Profile"
            />
            </Link>
            <span className="postUsername">
              {user.username || "Unknown User"}
            </span>
            <div className="postDate">{format(post.createdAt)}</div> {/* Display formatted date */}
          </div>

          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <div className="postText">
            <span>{post.desc}</span>
          </div>

          <img src={postImage} alt="Post" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt="like"
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}heart.jpeg`}
              alt="heart"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">
              {post.commentCount || 0} comments {/* Assuming commentCount is a number */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;















