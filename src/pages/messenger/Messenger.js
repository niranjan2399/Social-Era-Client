import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatLeft from "../../components/chatLeft/ChatLeft";
import Navbar from "../../components/navbar/Navbar";
import fetchFriends from "../../utils/fetchFriends";
import "./messenger.scss";

function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [convFriends, setConvFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const [fetchedMessages, setFetchedMessages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`/conversations/${user._id}`);
        const data = await fetchFriends(user._id);

        await Promise.all([res, data]).then((values) => {
          const convFr = values[0].data.map((conv) => {
            return values[1].find((friends) => conv.member[1] === friends._id);
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
          setConversations={setConversations}
          conversationFriends={convFriends}
          friends={friends}
          setConvFriends={setConvFriends}
          conversations={conversations}
          setFetchedMessages={setFetchedMessages}
          fetchedMessages={fetchedMessages}
        />
        {fetchedMessages ? (
          <ChatBox
            fetchedMessages={fetchedMessages}
            setFetchedMessages={setFetchedMessages}
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
