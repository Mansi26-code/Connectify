import React from 'react';
import "./rightbar.css";
import { Users } from "../../../dummyData";
import Online from "../online/Online"; // Adjust the path if necessary

export default function Rightbar({ Profile }) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

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
            <span className="rightbarInfoValue">Bangalore</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">India</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>

        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Rudra</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Anshu</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Rajnish</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Shivang</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Aksh</span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/avatar.webp`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowing">Rhea</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {Profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
