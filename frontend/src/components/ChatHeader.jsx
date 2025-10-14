export default function ChatHeader({ onLogout, username }) {
  return (
    <div className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div
          className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full
                       flex items-center justify-center shadow-lg"
        >
          <span className="text-white font-bold text-lg">
            {username.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">BubbleChat</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>
              Hello, <span className="font-semibold">{username}</span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="group flex items-center space-x-2 px-4 py-2 text-gray-700
                 hover:text-red-600 transition-all duration-200 rounded-xl
                 hover:bg-red-50 border border-transparent hover:border-red-200"
      >
        <svg
          className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span className="font-medium">Exit</span>
      </button>
    </div>
  );
}
