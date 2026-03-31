import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserMessage, fetchAIResponse } from "../redux/chatSlice";

const InputBox = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!input.trim()) return;

    dispatch(addUserMessage(input));
    dispatch(fetchAIResponse(input));
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