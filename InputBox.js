import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserMessage, fetchAIResponse } from "../redux/chatSlice";

const InputBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

 const handleSend = () => {
  if (!input.trim()) {
    alert("Message cannot be empty");
    return;
  }

  if (input.length > 1000) {
    alert("Message too long (max 1000 characters)");
    return;
  }

  dispatch(addUserMessage(input));
  dispatch(fetchAIResponse());
  setInput("");
};

  return (
    <div className="input-box">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputBox;