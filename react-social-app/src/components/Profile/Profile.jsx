import React, { useState, useEffect } from 'react';
import "./profile.css";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import Rightbar from "../rightbar/Rightbar";
import Feed from "../feed/Feed";
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Using the VITE_PUBLIC_FOLDER environment variable
const PF = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Profile() {
  const [user, setUser] = useState({});
  const { username } = useParams(); // Destructure username from params
  console.log("params", username); // Verify the value of username

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch user data by dynamic username from the backend
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        console.log('API response:', res.data); // Verify user data
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    // Fetch the user if username exists in params
    if (username) {
      fetchUser();
    }
  }, [username]); // Re-run effect when username changes

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {/* Display coverPicture or fallback to default */}
              <img 
                src={user.coverPicture ? PF + user.coverPicture : PF + "post/coverPic.webp"} 
                alt="Cover" 
                className="profileCoverImg" 
              />
              {/* Display profilePicture or fallback to default */}
              <img 
                src={user.profilePicture ? PF + user.profilePicture : PF + "person/avatar.webp"} 
                alt="Profile" 
                className="profileUserImg" 
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username || "Unknown User"}</h4>
              <span className="profileInfoDesc">{user.desc || "No description available"}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
