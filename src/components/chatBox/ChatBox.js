import React from "react";
import "./chatBox.scss";

function ChatBox() {
  return (
    <div className='chatDiv'>
      <div className="chat"></div>
      <div className="chatMessage_send">
        <textarea className="message"></textarea>
        <button className="sendMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
