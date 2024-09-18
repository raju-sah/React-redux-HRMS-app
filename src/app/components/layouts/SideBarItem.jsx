import { FiHome, FiSettings, FiList, FiUserPlus, FiUserX, FiBookOpen,  } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { BiCategory } from 'react-icons/bi';

const SideBarItem = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <FiHome size={15} />, path: '/dashboard' },
    {
      label: 'Books',
      icon: <FiBookOpen size={15} />,
      children: [
        { label: 'Books List', path: '/books', icon: <FiList size={15} /> },
        { label: 'Categories', path: '/book-categories', icon: <BiCategory size={15} /> },
        { label: 'Authors', path: '/authors', icon: <FiList size={15} /> },
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
    { label: 'Settings', icon: <FiSettings size={15} />, path: '/settings' },
  ];

  return <Sidebar menuItems={menuItems} />;
};

export default SideBarItem;