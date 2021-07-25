import React from "react";
import "./chatLeft.scss";

function ChatLeft() {
  return (
    <section className="friend_chat">
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
    </section>
  );
}

export default ChatLeft;
