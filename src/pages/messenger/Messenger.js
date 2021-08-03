import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatLeft from "../../components/chatLeft/ChatLeft";
import Navbar from "../../components/navbar/Navbar";
import fetchFriends from "../../utils/fetchFriends";
import "./messenger.scss";
import { io } from "socket.io-client";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [convFriends, setConvFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const [fetchedMessages, setFetchedMessages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8000", {
      reconnection: true,
      reconnectionDelay: 1000,
      maxReconnectionAttempts: Infinity,
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (data) => {
      console.log(data);
    });
  }, [user]);

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
      setConversations([]);
    };
  }, [user._id]);

  console.log(windowWidth); // clear �
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
        />
        {fetchedMessages ? (
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
