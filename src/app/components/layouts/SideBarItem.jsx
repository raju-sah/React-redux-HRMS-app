import { useState } from 'react';
import { FiHome, FiMenu, FiPieChart, FiSettings, FiUsers, FiList, FiUserCheck, FiUserPlus, FiUserX } from 'react-icons/fi';
import SideBar from './Sidebar';

const SideBarItem = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', icon: <FiHome size={15} />, path: '/dashboard' },
    {
      label: 'Users',
      icon: <FiUsers size={15} />,
      children: [
        { label: 'Manage Users', path: '/users-list', icon: <FiList size={15} /> },
        { label: 'User Settings', path: '/users/settings', icon: <FiUserCheck size={15} /> },
        {
          label: 'User Groups',
          icon: <FiUserPlus size={15} />,
          children: [
            { label: 'Create Group', path: '/users/groups/create', icon: <FiUserPlus size={15} /> },
            { label: 'Group Permissions', path: '/users/groups/permissions', icon: <FiUserX size={15} /> }
          ]
        }
      ]
    },
    { label: 'Analytics', icon: <FiPieChart size={15} />, path: '/analytics' },
    { label: 'Settings', icon: <FiSettings size={15} />, path: '/settings' }
  ];

  return (
    <div className="flex min-h-screen bg-primary text-white">
      <div className={`transition-all duration-300 ${isOpen ? 'w-52' : 'w-16'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <FiMenu size={22} />
          </button>
        </div>
        <nav className="mt-4 px-2">
          {menuItems.map((item, index) => (
            <SideBar key={index} item={item} isSidebarOpen={isOpen} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBarItem;