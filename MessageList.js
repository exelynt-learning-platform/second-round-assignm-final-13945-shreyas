import { useSelector } from "react-redux";

const MessageList = () => {
  const { messages, loading, error } = useSelector((state) => state.chat);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <div key={index} className={msg.role}>
          {msg.content}
        </div>
      ))}

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default MessageList;