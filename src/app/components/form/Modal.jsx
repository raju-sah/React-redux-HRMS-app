import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({
  headingText,
  buttonText,
  children,
  icon: Icon,
  className,
  btnId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Create a combined onClick handler if btnId is provided
  const handleClick = () => {
    if (btnId) {
      btnId();
    }
    openModal();
  };

  return (
    <div>
      {Icon ? (
        <Icon
          className={`cursor-pointer ${className || ""}`}
          onClick={handleClick}
        />
      ) : (
        <button
        onClick={openModal}
        className="bg-primary text-white py-1 px-2 text-sm rounded border hover:bg-transparent  hover:border-primary hover:text-primary"
        >
        {buttonText}
      </button>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full">
            <div className="flex justify-between p-3 bg-[#021526] text-white">
              <h2 className="text-lg font-bold">{headingText}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out cursor-pointer"
              >
                <RxCross2 className="w-8 h-6" />
              </button>
            </div>
            <div className="px-6 pb-6">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
