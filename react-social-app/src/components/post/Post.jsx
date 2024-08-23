import React, { useState } from 'react';
import "./post.css";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from '../../../dummyData';

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  if (post) {
    console.log(PF + post.photo);
  }

  const likeHandler = (e) => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);

    const icon = e.target;
    icon.classList.toggle("liked");
  };

  console.log(post);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={PF + Users.filter((u) => u.id === post.userId)[0].profilePicture}
              alt="Profile"
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post.userId)[0].username}
            </span>
            <div className="postDate">{post.date}</div>
          </div>

          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>

        <div className="postCenter">
          <div className="postText">
            <span>{post?.desc}</span>
          </div>

          <img src={PF + post.photo} alt="" className="postImg" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={PF + "like.png"}
              alt="like"
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={PF + "heart.jpeg"}
              alt="heart"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">
              {post.comment} comments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;














