import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useRef, useEffect } from "react";

export default function ChatWindow({ messages, username, onSend, onLogout }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative w-full max-w-md h-[600px] flex flex-col bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-200 z-10">
      <ChatHeader username={username} onLogout={onLogout} />
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            sender={msg.sender}
            text={msg.text}
            isOwn={msg.isOwn}
            isSystem={msg.isSystem}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput addMessage={onSend} />
    </div>
  );
}
