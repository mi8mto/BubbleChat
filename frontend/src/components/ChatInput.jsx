import { useState } from "react";

export default function ChatInput({ addMessage }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addMessage(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t border-gray-200">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your message..."
        className="flex-1 px-4 py-2 border rounded-full outline-none"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full"
      >
        Send
      </button>
    </form>
  );
}
