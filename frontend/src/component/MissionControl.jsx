export const MissionControl = ({ onClick }) => {
    return (
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none rounded-2xl px-6 py-3 mt-4 text-base font-bold shadow-lg hover:shadow-indigo-400 transition-transform duration-300 hover:scale-105"
      >
        🚀 Open Mission Control
      </button>
    );
  };
  
