import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const ToggleButton = ({ userId, isToggled, StatusChange }) => {
  const [toggled, setToggled] = useState(isToggled);

  useEffect(() => {
    setToggled(isToggled);
  }, [isToggled]);

  const handleToggle = useCallback(() => {
    const newStatus = !toggled ? 1 : 0;

    toast.promise(
      StatusChange({ id: userId, status: newStatus }).unwrap(),
      {
        pending: 'Changing Status...',
        success: 'Status changed successfully!',
        error: 'Failed to change status of user: Unknown error',
      }
    ).then(() => {
      setToggled(!toggled);
    });
  }, [toggled, userId, StatusChange]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={toggled}
        onChange={handleToggle}
      />
      <div
        className={`w-10 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-purple-300 transition duration-200 ${
          toggled ? "bg-purple-500" : "bg-gray-200"
        }`}
      >
        <div
          className={`absolute left-0 top-0 m-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 ${
            toggled ? "transform translate-x-4" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleButton;
