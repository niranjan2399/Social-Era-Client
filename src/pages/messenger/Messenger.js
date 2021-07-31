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
        />
        <ChatBox />
      </div>
    </>
  );
}

export default Messenger;
