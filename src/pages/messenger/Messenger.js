import axios from "../../axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatLeft from "../../components/chatLeft/ChatLeft";
import Navbar from "../../components/navbar/Navbar";
import { fetchFriends } from "../../utils/friends";
import "./messenger.scss";
// import { io } from "socket.io-client";

function Messenger({ socket }) {
  const [conversations, setConversations] = useState([]);
  const [convFriends, setConvFriends] = useState();
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const [fetchedMessages, setFetchedMessages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showChat, setShowChat] = useState(false);
  const [onlineFriends, setOnlineFriends] = useState(null);
  // const socket = useRef();

  // useEffect(() => {
  //   socket.current = io(process.env.SOCKET_ADDRESS, {
  //     reconnection: true,
  //     reconnectionDelay: 1000,
  //     maxReconnectionAttempts: Infinity,
  //   });
  // }, []);

  useEffect(() => {
    // socket.current.emit("addUser", user._id);
    console.log("asdf");
    socket &&
      socket.emit("getOnlineUsers", (data) => {
        console.log(data);
      });
    // socket.on("getUsers", (data) => {
    //   console.log(data);
    //   setOnlineFriends(data);
    // });

    return () => {
      setOnlineFriends(null);
    };
  }, [socket]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        const data = await fetchFriends(user._id);

        await Promise.all([res, data]).then((values) => {
          const convFr = values[0].data.map((conv) => {
            return values[1].find((friends) =>
              conv.member.includes(friends._id)
            );
          });

          setConvFriends(convFr);
        });

        setFriends(data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    })();

    return () => {
      setFriends(null);
      setConversations(null);
      setConvFriends(null);
    };
  }, [user._id]);

  useEffect(() => {
    var resizeTimer;

    const resizeHandler = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 250);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    document.querySelector(".messenger_container")?.removeAttribute("style");

    if (windowWidth >= 480) {
      document.querySelector(".navigation_overlay").removeAttribute("style");
      document.querySelector(".left_section").removeAttribute("style");
      document.querySelector(
        ".navbar .left .navigationIcon .hamburger input"
      ).checked = false;
    }

    if (windowWidth <= 767) {
      document
        .querySelector(".chatDiv")
        ?.setAttribute("style", "display: none");

      document
        .querySelector(".messenger_intro")
        ?.setAttribute("style", "display: none");
    } else {
      document.querySelector(".chatDiv")?.removeAttribute("style");
      document.querySelector(".messenger_intro")?.removeAttribute("style");
    }
  }, [windowWidth]);

  return (
    <>
      <Navbar />
      <div className="container_chat">
        <ChatLeft
          conversations={conversations}
          setConversations={setConversations}
          conversationFriends={convFriends}
          setConvFriends={setConvFriends}
          fetchedMessages={fetchedMessages}
          setFetchedMessages={setFetchedMessages}
          friends={friends}
          windowWidth={windowWidth}
          setShowChat={setShowChat}
          onlineFriends={onlineFriends}
        />
        {showChat ? (
          <ChatBox
            fetchedMessages={fetchedMessages}
            setFetchedMessages={setFetchedMessages}
            socket={socket}
            conversations={conversations}
          />
        ) : (
          <div className="messenger_intro">
            <span>Select a conversation to view chat!</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Messenger;
