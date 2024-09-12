import { FiHome, FiPieChart, FiSettings, FiUsers, FiList, FiUserCheck, FiUserPlus, FiUserX } from 'react-icons/fi';
import Sidebar from './Sidebar';

const SideBarItem = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <FiHome size={15} />, path: '/dashboard' },
    {
      label: 'Users',
      icon: <FiUsers size={15} />,
      children: [
        { label: 'Manage Users', path: '/users-list', icon: <FiList size={15} /> },
        { label: 'Address', path: '/address', icon: <FiUserCheck size={15} /> },
        {
          label: 'User Groups',
          icon: <FiUserPlus size={15} />,
          children: [
            { label: 'Create Group', path: '/create-group', icon: <FiUserPlus size={15} /> },
            { label: 'Group Permissions', path: '/users/groups/permissions', icon: <FiUserX size={15} /> }
          ]
        }
      ]
    },
    { label: 'Analytics', icon: <FiPieChart size={15} />, path: '/analytics' },
    { label: 'Settings', icon: <FiSettings size={15} />, path: '/settings' }
  ];

  return <Sidebar menuItems={menuItems} />;
};

export default SideBarItem;