import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Spinner from '../Spinner';
import { useDeleteUserByIdMutation } from '../../../features/users/usersApiSlice';

const Delete = ({ user }) => {
  const [deleteUser] = useDeleteUserByIdMutation();
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
        confirmButtonText: 'Yes, delete it!'
      });

      if (isConfirmed) {
        await deleteUser(user._uuid).unwrap();
        Swal.fire({
          title: 'Deleted!',
          text: 'The user has been deleted.',
          icon: 'success'
        });
      }
    } catch (err) {
      console.error('Failed to delete the user:', err);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue deleting the user.',
        icon: 'error'
      });
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
          <Spinner id={`spinner-${user._uuid}`} />
        </div>
      )}
    </div>
  );
};

export default Delete;