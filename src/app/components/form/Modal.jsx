import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { closeModal, openModal } from "../../../features/modal/modalSlice";
import React from "react";

const Modal = ({
  modalId,
  headingText,
  buttonText,
  children,
  icon: Icon,
  className,
  setbtnIdFunc,
}) => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modal.openModals[modalId]);

  const handleOpen = () => {
    if (setbtnIdFunc) {
      setbtnIdFunc();
    }
    dispatch(openModal(modalId));
  };

  const handleClose = () => {
    dispatch(closeModal(modalId));
  };

  return (
    <div>
      {Icon ? (
        <Icon
          className={`cursor-pointer ${className || ""}`}
          onClick={handleOpen}
        />
      ) : (
        <button
          onClick={handleOpen}
          className="bg-primary text-white py-1 px-2 text-sm rounded border hover:bg-transparent hover:border-primary hover:text-primary"
        >
          {buttonText}
        </button>
      )}
      {modalState && modalState.isOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-60 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full">
            <div className="flex justify-between p-3 bg-[#021526] text-white">
              <h2 className="text-lg font-bold">{headingText}</h2>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out cursor-pointer"
              >
                <RxCross2 className="w-8 h-6" />
              </button>
            </div>
            <div className="px-6 pb-6">
              {typeof children === 'function' 
                ? children({ modalId }) 
                : React.cloneElement(children, { modalId })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
