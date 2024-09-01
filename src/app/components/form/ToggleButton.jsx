const ToggleButton = ({ isToggled, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isToggled); 
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isToggled}
        onChange={handleToggle}
      />
      <div
        className={`w-10 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-purple-300 transition duration-200 ${
          isToggled ? "bg-purple-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute left-0 top-0 m-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
            isToggled ? "transform translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
