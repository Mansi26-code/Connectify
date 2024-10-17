import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Ensure axios is imported
import { format } from 'timeago.js';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Ensure you are importing AuthContext

const Post = ({ post }) => {
  const { user: currentUser } = useContext(AuthContext); // Move this inside the component
  const [like, setLike] = useState(post.likes.length); // Assuming post.likes is an array
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  // Fetch user details when post.userId changes
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use query parameter to fetch user by userId
        const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
        console.log('API response:', res.data); // Check the structure of the response
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [post.userId]);

  // Handler for like button click
  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:8800/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.error('Error liking the post:', err);
    }
    setLike((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
    setIsLiked(!isLiked);
  };

  // Handle missing profile picture and post image gracefully
  const profilePicture = user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/avatar.webp`;
  const postImage = post.img ? `${PF}${post.img}` : `${PF}defaultPostImage.png`;

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={profilePicture}
                alt="Profile"
              />
            </Link>
            <span className="postUsername">
              {user.username || "Unknown User"}
            </span>
            <div className="postDate">{format(post.createdAt)}</div>
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
              {post.commentCount || 0} comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

















