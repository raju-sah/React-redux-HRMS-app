import { FaTrash } from "react-icons/fa";
import { Spinner } from "../Spinner";
import { useDelete } from "../../../hooks/useDeleteHook";

export const Delete = ({ itemId, deleteFn }) => {
  const { isDeleting, handleDelete } = useDelete(deleteFn);

  return (
    <div className={`relative ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <FaTrash
        className="text-danger text-lg cursor-pointer"
        onClick={() => handleDelete(itemId)}
        style={{ pointerEvents: isDeleting ? 'none' : 'auto' }}
      />
      {isDeleting && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};
