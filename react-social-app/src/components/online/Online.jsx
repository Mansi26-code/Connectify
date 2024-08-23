import "./online.css"
import React from 'react'

export default function Online({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="rightBarFriend">
    <div className="rightbarProfileImageContainer"> {/* Corrected class name */}
     <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
     <span className="rightbarOnline"></span>
    </div>
    <div className="rightbarUsername">{user.username}</div>
</li>
  )
}
