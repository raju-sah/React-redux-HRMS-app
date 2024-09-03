import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { LiaDotCircle } from "react-icons/lia";

const SideBar = ({ item, depth = 0, isSidebarOpen }) => {
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

  return (
    <div className="mb-1">
      {item.path ? (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
              depth > 0 && isSidebarOpen ? 'ml-4' : ''
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
          className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${depth > 0 && isSidebarOpen ? 'ml-4' : ''}`}
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
      )}
      {isOpen && isSidebarOpen && item.children && (
        <div className="mt-1">
          {item.children.map((child, index) => (
            <SideBar 
              key={index} 
              item={{
                ...child, 
                icon: <LiaDotCircle />
              }} 
              depth={depth + 1} 
              isSidebarOpen={isSidebarOpen} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;