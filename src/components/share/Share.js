import React, { useContext, useRef, useState } from "react";
import "./share.scss";
import {
  PhotoLibrary,
  LocationOn,
  Label,
  EmojiEmotions,
} from "@material-ui/icons";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleShare = async (e) => {
    e.preventDefault();
    const newPost = {
      desc: desc.current.value,
      userId: user._id,
    };

    if (file) {
      const fileData = new FormData();
      const fileName = Date.now() + file.name;
      fileData.append("name", fileName);
      fileData.append("file", file);
      newPost.img = fileName;

      try {
      await axios.post("upload/", fileData);
        } catch (err) {
          console.log(err);
        }
    }

    try {
    const res = await axios.post("posts/", newPost);
    console.log(res);
    window.location.reload();
    } catch (err) {
    console.log(err);
    }
  };

  return (
    <div className="share">
      <div className="input_text">
        <div className="profile_pic">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "noProfilePic.png"
            }
            alt=""
          />
        </div>
        <input type="text" ref={desc} placeholder="What's on your mind?" />
      </div>
      <hr />
      <form className="options" onSubmit={handleShare}>
        <div className="option">
          <label htmlFor="file">
            <PhotoLibrary className="photoIcon" />
            <span>Photo/Video</span>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <div>
            <Label className="labelIcon" />
            <span>Tag</span>
          </div>
          <div>
            <LocationOn className="locationIcon" />
            <span>Location</span>
          </div>
          <div>
            <EmojiEmotions className="feelingsIcon" />
            <span>Feelings</span>
          </div>
        </div>
        <button type="submit">Share</button>
      </form>
    </div>
  );
}

export default Share;
