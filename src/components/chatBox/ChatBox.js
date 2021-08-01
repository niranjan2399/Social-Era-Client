import React, { useContext, useState } from "react";
import "./chatBox.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import moment from "moment";

function ChatBox({ fetchedMessages, setFetchedMessages }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [toSendMessage, setToSendMessage] = useState("");
  const { user } = useContext(AuthContext);
  console.log(fetchedMessages);

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = {
      senderId: user._id,
      message: toSendMessage,
      time: Date.now(),
    };
    try {
      await axios.put(`/messages/${fetchedMessages.conversationId}`, data);
      setFetchedMessages((fetchedData) => {
        const messages = [...fetchedData.messages, data];
        fetchedData.messages = messages;
        return fetchedData;
      });
      setToSendMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatDiv">
      <div className="chat">
        {fetchedMessages.messages.map((message) => {
          return message.senderId !== user._id ? (
            <div
              className="messageContainer friends_message"
              key={message.time}
            >
              <picture className="profilePicture">
                <img src={PF + "noProfilePic.png"} alt="" />
              </picture>
              <div>
                <div className="message">
                  <p>{message.message}</p>
                </div>
                <span>{moment(message.time).fromNow()}</span>
              </div>
            </div>
          ) : (
            <div className="messageContainer own_message" key={message.time}>
              <picture className="profilePicture">
                <img src={PF + "noProfilePic.png"} alt="" />
              </picture>
              <div>
                <div className="message">
                  <p>{message.message}</p>
                </div>
                <span>{moment(message.time).fromNow()}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chatMessage_send">
        <textarea
          className="message"
          value={toSendMessage}
          onChange={(e) => {
            setToSendMessage(e.target.value);
          }}
        />
        <button className="sendMessage" onClick={sendMessage}>
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
      </div>
    </div>
  );
}

export default ChatBox;
