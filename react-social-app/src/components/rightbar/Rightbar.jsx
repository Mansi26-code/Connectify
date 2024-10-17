import React from 'react';
import "./rightbar.css";
import { Users } from "../../../dummyData";
import Online from "../online/Online"; // Adjust the path if necessary

export default function Rightbar({ user }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  // Log the user prop to check its structure
  console.log("User object:", user);
  if (user) {
    console.log("City:", user.city);
    console.log("From:", user.from);
    console.log("desc:", user.desc);
    console.log("username:", user.username);
    console.log("Relationship:", user.relationship);
  }

  // Helper function to convert relationship status to text
  const getRelationshipStatus = (relationship) => {
    switch (relationship) {
      case 1:
        return "Single";
      case 2:
        return "Married";
      case 3:
        return "It's Complicated";
      default:
        return "Unknown";
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}birthday.jpeg`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Rudra</b> and <b>2 other friends</b> have a birthday today!!
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.jpg`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city || 'Unknown'}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from || 'Unknown'}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            {/* Use the helper function to convert relationship status */}
            <span className="rightbarInfoValue">
              {getRelationshipStatus(user?.relationship)}
            </span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar1.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Rudra</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar2.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Anshu</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar3.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Rajnish</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar4.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Shivang</span>
          </div>
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar5.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Aksh</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
