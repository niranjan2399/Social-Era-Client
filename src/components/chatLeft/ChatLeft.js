import React from "react";
import "./chatLeft.scss";

function ChatLeft() {
  return (
    <div className="friend_chat">
      <div className="friend_div">
        <div className="picture_friend"></div>
        <div className='details'>
          <div className="friend_name"><span>Name</span></div>
          <div className="friend_status">
            <div className="indicator"></div>
            <span className="text">Online</span>
          </div>
        </div>
      </div>
      <div className="right_chat"></div>
    </div>
  );
}

export default ChatLeft;
