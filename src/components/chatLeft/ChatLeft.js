import React, { useContext, useEffect } from "react";
import "./chatLeft.scss";
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";
import { Close } from "@material-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import LeftSection from "../../components/leftSection/LeftSection";

function ChatLeft({
  setConversations,
  conversationFriends,
  friends,
  setConvFriends,
  conversations,
  setFetchedMessages,
  fetchedMessages,
}) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document
      .querySelector(".left_section .friends_div")
      .setAttribute("style", "display: none");

    document
      .querySelector(".left_section hr")
      .setAttribute("style", "display: none");

    document.querySelectorAll(".tag span").forEach((span) => {
      span.setAttribute("style", "display: none");
    });
  }, []);

  const toggleFriends = () => {
    const overlay = document.querySelector(".overlay");

    if (overlay.hasAttribute("style")) {
      overlay.removeAttribute("style");
    } else {
      overlay.setAttribute("style", "display: flex");
    }
  };

  const createConversation = async (e) => {
    const selector = e.currentTarget.getAttribute("selector");

    try {
      const res = await axios.post("/conversations", {
        senderId: user._id,
        receiverId: selector,
      });

      setConversations((oldConv) => {
        return [...oldConv, res.data];
      });

      setConvFriends((oldConvFriends) => {
        const toAdd = friends.find((friend) => friend._id === selector);
        return [...oldConvFriends, toAdd];
      });

      toggleFriends();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteConversation = async (e) => {
    const selector = e.currentTarget.getAttribute("data-selector");
    const conv = conversations.find(
      (conversation) => conversation.member[1] === selector
    );

    try {
      await axios.delete(`/conversations/${conv._id}`);
      await axios.delete(`/messages/${conv._id}`);

      setConversations((friends) => {
        return [...friends.filter((f) => f.member[1] !== selector)];
      });

      setConvFriends((friends) => {
        return [...friends.filter((f) => f._id !== selector)];
      });

      if (fetchedMessages.conversationId === conv._id) {
        setFetchedMessages(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFetchMessage = async (e) => {
    const friend_conv = conversations.find((conv) => {
      return conv.member.includes(
        e.currentTarget.getAttribute("data-selector")
      );
    });
    const res = await axios.get(`/messages/${friend_conv._id}`);
    setFetchedMessages(res.data);
  };

  return (
    <div className="messenger_container" style={{ display: "flex" }}>
      <LeftSection />
      <section className="friend_chat">
        <button className="startConv" onClick={toggleFriends}>
          <FontAwesomeIcon icon={faPlusCircle} className="icon" />
          <span>Start new Conversation</span>
        </button>
        <div className="friend_div">
          {conversationFriends &&
            conversationFriends.map((conversationData) => {
              return (
                <div className="friend" key={conversationData._id}>
                  <div
                    className="friend_conversation"
                    data-selector={conversationData._id}
                    onClick={toggleFetchMessage}
                  >
                    <div className="picture_friend"></div>
                    <div className="details">
                      <div className="friend_name">
                        <span>
                          {conversationData.firstName +
                            " " +
                            conversationData.lastName}
                        </span>
                      </div>
                      <div className="friend_status">
                        <div className="indicator"></div>
                        <span className="text">Online</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="delete"
                    data-selector={conversationData._id}
                    onClick={deleteConversation}
                  >
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
    </div>
  );
}

export default ChatLeft;
