import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight, FiMenu } from "react-icons/fi";
import { LiaDotCircle } from "react-icons/lia";

const SidebarItem = ({
  item,
  depth = 0,
  isSidebarOpen,
  openMenus,
  setOpenMenus,
  isTopLevel,
}) => {
  const location = useLocation();

  const isChildActive = (menuItem) => {
    if (menuItem.path) {
      return location.pathname === menuItem.path;
    }
    if (menuItem.children) {
      return menuItem.children.some((child) => isChildActive(child));
    }
    return false;
  };

  const isActive = isChildActive(item);

  // Update openMenus only when the active state changes
  useEffect(() => {
    if (isActive) {
      let currentItem = item;
      let menuPath = [];
      while (currentItem) {
        menuPath.unshift(currentItem.label);
        currentItem = currentItem.parent;
      }
      setOpenMenus((prevOpenMenus) => {
        const newOpenMenus = new Set(prevOpenMenus);
        menuPath.forEach((label) => newOpenMenus.add(label));
        return newOpenMenus;
      });
    }
  }, [isActive, item.label, setOpenMenus]); // Ensure item.label is a dependency

  const isOpen = openMenus.has(item.label);

  const getMarginClass = () => `ml-${depth * 4 || 0}`;

  const handleClick = () => {
    if (isSidebarOpen && item.children) {
      if (isTopLevel) {
        setOpenMenus(new Set(isOpen ? [] : [item.label]));
      } else {
        setOpenMenus((prevOpenMenus) => {
          const newOpenMenus = new Set(prevOpenMenus);
          if (isOpen) {
            newOpenMenus.delete(item.label);
          } else {
            newOpenMenus.add(item.label);
          }
          return newOpenMenus;
        });
      }
    } else if (isTopLevel) {
      setOpenMenus(new Set());
    }
  };

  const content = item.path ? (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${getMarginClass()} ${
          isActive ? "bg-gray-700" : ""
        }`
      }
      onClick={handleClick}
    >
      {React.cloneElement(item.icon, {
        className: isActive ? "text-red-500" : "text-gray-500",
      })}
      {isSidebarOpen && <span className="ml-2 text-sm">{item.label}</span>}
    </NavLink>
  ) : (
    <div
      className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${getMarginClass()}`}
      onClick={handleClick}
    >
      {React.cloneElement(item.icon, {
        className: isActive ? "text-red-500" : "text-gray-500",
      })}
      {isSidebarOpen && (
        <>
          <span className="ml-2 text-sm">{item.label}</span>
          {item.children && (
            <span className="ml-auto">
              {isOpen ? (
                <FiChevronDown size={16} />
              ) : (
                <FiChevronRight size={16} />
              )}
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
                icon: <LiaDotCircle />,
                parent: item,
              }}
              depth={depth + 1}
              isSidebarOpen={isSidebarOpen}
              openMenus={openMenus}
              setOpenMenus={setOpenMenus}
              isTopLevel={false}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const Sidebar = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState(new Set());

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <div
        className={`transition-all duration-300 ${isOpen ? "w-52" : "w-16"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <FiMenu size={22} />
          </button>
        </div>
        <nav className="mt-4 px-2">
          <ul className="list-none">
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                isSidebarOpen={isOpen}
                openMenus={openMenus}
                setOpenMenus={setOpenMenus}
                isTopLevel={true}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
