import React from 'react'
import "./profile.css"
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
const PF = import.meta.env.VITE_PUBLIC_FOLDER;

export default function Profile() {
  console.log(`{PF} post/post2.jpg`);
   
  return (
    <>
    <Topbar/>
    <div className="profile">

    <Sidebar/> 

    <div className="profileRight">
        
        <div className="profileRightTop">
        <div className="profileCover">
         
        <img src={`${PF}post/post2.jpg`} alt="" className="profileCoverImg" />
        <img src={`${PF}person/download.jpeg`} alt="" className="profileUserImg" />
             </div>
           <div className="profileInfo">
            <h4 className="profileInfoName">Mansi Swaraj</h4>
            <span className="profileInfoDesc">I am a SWE-3 @Google</span>
           </div>
        </div>
        <div className="profileRightBottom">

            <Feed username="Rudra"/>
            <Rightbar Profile/>
             {/* it will indicate if rightbar is in profile page or home page */}
        </div>
    </div>
    </div>


      
        
        
        
     </>
  )
}
