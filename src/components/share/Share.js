import React from "react";
import "./share.scss";
import {
  PhotoLibrary,
  LocationOn,
  Label,
  EmojiEmotions,
} from "@material-ui/icons";

function Share() {
  return (
    <div className="share">
      <div className="input_text">
        <div className="profile_pic"></div>
        <input type="text" placeholder="What's on your mind?" />
      </div>
      <hr />
      <div className="options">
        <div className="option">
          <div>
            <PhotoLibrary className="photoIcon" />
            <span>Photo or Video</span>
          </div>
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
        <button>Share</button>
      </div>
    </div>
  );
}

export default Share;
