import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronDown, FiChevronRight, FiMenu } from 'react-icons/fi';
import { LiaDotCircle } from "react-icons/lia";

const SidebarItem = ({ item, depth = 0, isSidebarOpen, parentLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isChildActive = (item) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.children) {
      return item.children.some(child => isChildActive(child));
    }
    return false;
  };

  const getMarginClass = () => {
    if (depth === 1) {
      return 'ml-4';
    }
    if (depth === 2) {
      return 'ml-8';
    }
    return '';
  };

  const content = item.path ? (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
          getMarginClass()
        } ${isActive ? 'bg-gray-700' : ''}`
      }
    >
      {React.cloneElement(item.icon, {
        className: isChildActive(item) ? "text-red-500" : "text-gray-500"
      })}
      {isSidebarOpen && <span className="ml-2 text-sm">{item.label}</span>}
    </NavLink>
  ) : (
    <div
      className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${isChildActive(item) ? 'bg-gray-700' : ''} ${getMarginClass()}`}
      onClick={() => isSidebarOpen && setIsOpen(!isOpen)}
    >
      {React.cloneElement(item.icon, {
        className: isChildActive(item) ? "text-red-500" : "text-gray-500"
      })}
      {isSidebarOpen && (
        <>
          <span className="ml-2 text-sm">{item.label}</span>
          {item.children && (
            <span className="ml-auto">
              {isOpen ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
            </span>
          )}
        </>
      )}
    </div>
  );

  return (
    <li className="mb-1">
      {content}
      {isOpen && isSidebarOpen && item.children && (
        <ul className="mt-1 list-none">
          {item.children.map((child, index) => (
            <SidebarItem
              key={index}
              item={{
                ...child,
                icon: <LiaDotCircle />
              }}
              depth={depth + 1}
              isSidebarOpen={isSidebarOpen}
              parentLabel={item.label}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <div className={`transition-all duration-300 ${isOpen ? 'w-52' : 'w-16'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <FiMenu size={22} />
          </button>
        </div>
        <nav className="mt-4 px-2">
          <ul className="list-none">
            {menuItems.map((item, index) => (
              <SidebarItem key={index} item={item} isSidebarOpen={isOpen} parentLabel="" />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;