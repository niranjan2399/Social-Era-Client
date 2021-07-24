import React from "react";
import ChatBox from "../../components/chatBox/ChatBox";
import ChatLeft from "../../components/chatLeft/ChatLeft";
import Navbar from "../../components/navbar/Navbar";
import "./messenger.scss";

function Messenger() {
  return (
    <>
      <Navbar />
      <div className="container_chat">
        <ChatLeft />
        {/* <ChatBox /> */}
      </div>
    </>
  );
}

export default Messenger;
