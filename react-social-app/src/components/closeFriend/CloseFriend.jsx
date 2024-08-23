import React from 'react'



export default function CloseFriend({user}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg" src={PF+user.profilePicture} alt="evie"/>
    <span className="sidebarFriendName">{user.username}</span>

</li>
  )
}
