import React from "react";
import "./chatBox.scss";

function ChatBox() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatDiv">
      <div className="chat">
        <div className="messageContainer friends_message">
          <picture className="profilePicture">
            <img src={PF + "noProfilePic.png"} alt="" />
          </picture>
          <div>
            <div className="message">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente aliquam eaque, officia reprehenderit dicta nesciunt
                velit quia ad sequi deserunt voluptatem minima dolor id
                reiciendis, minus eveniet molestias, similique odit.
              </p>
            </div>
            <span>time</span>
          </div>
        </div>
        <div className="messageContainer own_message">
          <picture className="profilePicture">
            <img src={PF + "noProfilePic.png"} alt="" />
          </picture>
          <div>
            <div className="message">
              <p>
                Lorem, ipsum dolor sit amet consectetur 
              </p>
            </div>
            <span>time</span>
          </div>
        </div>
      </div>
      <form className="chatMessage_send">
        <textarea className="message"></textarea>
        <button className="sendMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
