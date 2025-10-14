export default function ChatMessage({ sender, text, isOwn, isSystem }) {
  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
          {text}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none border"
        }`}
      >
        {!isOwn && (
          <div className="text-xs font-semibold text-gray-500 mb-1">
            {sender}
          </div>
        )}
        <div className="text-sm">{text}</div>
      </div>
    </div>
  );
}
