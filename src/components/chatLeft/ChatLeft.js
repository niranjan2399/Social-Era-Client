import React, { useContext, useEffect, useState } from "react";
import "./chatLeft.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Close } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import fetchFriends from "../../utils/fetchFriends";

function ChatLeft() {
  const [conversations, setConversations] = useState([]);
  const [conversationFriends, setConversationFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const conversationsAndFriends = async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        const convFriends = await Promise.all(
          res.data.map((c) => {
            return axios.get(`/users/${c.member[1]}`);
          })
        );
        setConversationFriends(convFriends);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    conversationsAndFriends();
  }, [user._id]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await fetchFriends(user._id);
        setFriends(data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
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
    const selector =
      e.target.nodeName.toLowerCase() === "div"
        ? e.target.getAttribute("selector")
        : e.target.parentElement.getAttribute("selector");
    try {
      const res = await axios.post("/conversations", {
        senderId: user._id,
        receiverId: selector,
      });
      setConversations([...conversations, res.data]);
      toggleFriends();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="friend_chat">
      <button className="startConv" onClick={toggleFriends}>
        <FontAwesomeIcon icon={faPlusCircle} className="icon" />
        <span>Start new Conversation</span>
      </button>
      <div className="friend_div">
        {conversationFriends &&
          conversationFriends.map((friendData) => {
            return (
              <div className="friend" key={friendData.data._id}>
                <div className="picture_friend"></div>
                <div className="details">
                  <div className="friend_name">
                    <span>
                      {friendData.data.firstName +
                        " " +
                        friendData.data.lastName}
                    </span>
                  </div>
                  <div className="friend_status">
                    <div className="indicator"></div>
                    <span className="text">Online</span>
                  </div>
                </div>
                <div className="delete">
                  <FontAwesomeIcon icon={faTrashAlt} className="icon" />
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
