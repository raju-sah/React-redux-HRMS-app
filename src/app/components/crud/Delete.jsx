import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import {Spinner} from "../Spinner"; // Ensure Spinner component exists or replace with your own

export const Delete = ({ itemId, deleteFn }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const { isConfirmed } = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (isConfirmed && deleteFn) {
        await deleteFn(itemId).unwrap(); // Pass the itemId to deleteFn
        Swal.fire('Deleted!', 'Deleted successfully.', 'success');
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      Swal.fire('Error!', 'There was an issue deleting.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`relative ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <FaTrash
        className="text-danger text-lg cursor-pointer"
        onClick={handleDelete}
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
