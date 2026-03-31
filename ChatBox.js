import React from "react";
import MessageList from "./MessageList";
import InputBox from "./InputBox";

const ChatBox = () => {
  return (
    <div className="chat-container">
      <MessageList />
      <InputBox />
    </div>
  );
};

export default ChatBox;