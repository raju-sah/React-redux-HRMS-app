import { useState } from "react";
import Swal from "sweetalert2";

export const useDelete = (deleteFn) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (itemId) => {
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
        await deleteFn(itemId).unwrap();
        Swal.fire('Deleted!', 'Deleted successfully.', 'success');
      }
    } catch (error) {
      Swal.fire('Error!', 'There was an issue deleting.', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDelete };
};
