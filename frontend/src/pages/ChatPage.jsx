import { useEffect, useRef, useState } from "react";
import BackgroundBubbles from "../components/BackgroundBubbles";
import NameModal from "../components/NameModal";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [tabId] = useState(
    () => `tab_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
  );

  const ws = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("chatUsername");
    if (saved) {
      setUsername(saved);
      setShowNameModal(false);
    }
  }, []);

  useEffect(() => {
    if (!username) return;

    // ws.current = new WebSocket("ws://localhost:8080");
    ws.current = new WebSocket("wss://bubblechat-production.up.railway.app");
    ws.current.onopen = () => console.log("✅ Connected");

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          isOwn: data.sender === username && data.tabId === tabId,
          isSystem: data.type !== "message",
        },
      ]);
    };

    return () => ws.current?.close();
  }, [username]);

  const handleLogin = () => {
    if (!username.trim()) return;
    sessionStorage.setItem("chatUsername", username.trim());
    setShowNameModal(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("chatUsername");
    setUsername("");
    setMessages([]);
    setShowNameModal(true);
  };

  const handleSend = (text) => {
    if (!text.trim()) return;
    const msg = {
      type: "message",
      sender: username,
      text: text.trim(),
      tabId,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, { ...msg, isOwn: true }]);
    ws.current?.send(JSON.stringify(msg));
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-400 via-purple-500 to-blue-400">
      <BackgroundBubbles />
      {showNameModal ? (
        <NameModal
          username={username}
          setUsername={setUsername}
          onLogin={handleLogin}
        />
      ) : (
        <ChatWindow
          messages={messages}
          username={username}
          onSend={handleSend}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
