import React, { useContext, useEffect, useState } from "react";
import "./chatLeft.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Close } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import fetchFriends from "../../utils/fetchFriends";

function ChatLeft() {
  const [conversations, setConversations] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const conversationsAndFriends = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        const data = await fetchFriends(user._id);
        setFriends(data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    conversationsAndFriends();
  }, [user._id]);

  const toggleFriends = () => {
    const overlay = document.querySelector(".overlay");
    if (overlay.hasAttribute("style")) {
      overlay.removeAttribute("style");
    } else {
      overlay.setAttribute("style", "display: flex");
    }
  };

  const createConversation = async (e) => {
    // try {
      // const res = await axios.post("/conversations", {
      //   senderId: user._id,
      //   receiverId: e.target.getAttribute("selector"),
      // });
      // setConversations([...conversations, res.data]);
      // toggleFriends();
    // } catch (err) {
      // console.log(err);
    // }
  };

  return (
    <section className="friend_chat">
      <button className="startConv" onClick={toggleFriends}>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
        <span>Start new Conversation</span>
      </button>
      <div className="friend_div">
        {conversations.map((conversation) => {
          return (
            <div className="friend">
              <div className="picture_friend"></div>
              <div className="details">
                <div className="friend_name">
                  <span>Name</span>
                </div>
                <div className="friend_status">
                  <div className="indicator"></div>
                  <span className="text">Online</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="right_chat"></div>
      <div className="overlay">
        <div className="friends_overlay">
          <div className="top">
            Select a Friend to start Conversation
            <Close className="icon" onClick={toggleFriends} />
          </div>
          <div className="friendsList">
            {friends.map((friend) => {
              return (
                <div
                  className="friend"
                  onClick={createConversation}
                  key={friend._id}
                  selector={friend._id}
                >
                  <picture className="profilePic"></picture>
                  <span>{friend.firstName + " " + friend.lastName}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatLeft;
