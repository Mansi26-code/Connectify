import "./share.css";
import { useRef, useState } from "react";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';

export default function Share() {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={`${PF}person/avatar.webp`} // Provide a default path or an image link
                        alt="" 
                    />
                    <input 
                        placeholder="Share your thoughts..." 
                        className="shareInput" 
                        ref={desc} 
                    />
                </div>
                <hr className="shareHr" />
                <form className="shareBottom" onSubmit={(e) => e.preventDefault()}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png,.jpg,.jpeg,.webp" 
                                onChange={(e) => setFile(e.target.files[0])} 
                                style={{ display: "none" }} 
                            />
                        </label>

                        <div className="shareOption">
                            <LabelIcon htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>

                        <div className="shareOption">
                            <RoomIcon htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>

                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor="gold" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">Share</button>
                </form>
            </div>
        </div>
    );
}
