import React, { useContext, useState, useEffect, useRef } from "react";
import "./chatBox.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "../../axios";
import moment from "moment";
import { friendOfUser } from "../../utils/friendOfUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ChatBox({
  fetchedMessages,
  setFetchedMessages,
  socket,
  conversations,
}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [toSendMessage, setToSendMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const intoView = useRef();

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        message: data.text,
        time: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const convFriendId = friendOfUser(conversations, user, fetchedMessages);

    arrivalMessage &&
      convFriendId === arrivalMessage.senderId &&
      setFetchedMessages((prev) => {
        prev.messages = [...prev.messages, arrivalMessage];
        return prev;
      });

    setArrivalMessage(null);
  }, [
    arrivalMessage,
    conversations,
    fetchedMessages,
    setFetchedMessages,
    user,
  ]);

  useEffect(() => {
    intoView.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages.messages]);

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

    const receiverId = friendOfUser(conversations, user, fetchedMessages);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: toSendMessage,
    });
  };

  return (
    <div className="chatDiv">
      <div className="chat">
        <div className="chat_top">
          <div className="back">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <picture></picture>
          <div>
            <span></span>
          </div>
        </div>
        {fetchedMessages.messages.map((message, i) => {
          return message.senderId !== user._id ? (
            <div
              ref={intoView}
              className="messageContainer friends_message"
              key={i}
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
            <div
              ref={intoView}
              className="messageContainer own_message"
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
          );
        })}
        <div ref={intoView}></div>
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
