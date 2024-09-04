// src/components/Navbar.js
import { FaSearch, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-primary text-white py-2 px-3 flex items-center justify-between">
      {/* Search Field */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white p-1 rounded border border-gray-600 focus:outline-none  focus:border-blue-500"
        />
        <FaSearch
          className="text-gray-400 text-2xl cursor-pointer hover:text-white"
          onClick={() => {}}
        />
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <FaBell className="text-gray-400 cursor-pointer hover:text-white" />

        {/* Profile Section */}
        <Link to="/profile">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-600"
            />
            <span className="text-sm">John Doe</span>
          </div>
        </Link>

        <Link to="/settings">
          <FaCog className="text-gray-400 cursor-pointer hover:text-white" />{" "}
        </Link>

        <Link to="/login">
          <FaSignOutAlt className="text-gray-400 cursor-pointer hover:text-white" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
