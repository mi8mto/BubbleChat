export default function NameModal({ username, setUsername, onLogin }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onLogin();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/50">
      <div className="bg-white rounded-xl p-6 w-80 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4">Enter your name</h2>
        <p className="text-sm text-gray-600 mb-3 text-center">
          Each tab is a separate user
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-2 border rounded mb-4"
          placeholder="Your name"
          autoFocus
        />
        <button
          onClick={onLogin}
          disabled={!username.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enter the chat
        </button>
      </div>
    </div>
  );
}
