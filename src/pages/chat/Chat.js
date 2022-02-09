import React from "react";
import ChatBox from "../../components/chatBox/ChatBox";
import LeftSection from "../../components/leftSection/LeftSection";

export default function Chat() {
  return (
    <div className="chatContainer">
      <LeftSection />
      <div className="chatContainer__chat">
        <ChatBox />
      </div>
    </div>
  );
}
