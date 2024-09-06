import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const useUpdateHook = (updateQuery) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = updateQuery();

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        updateUser(data).unwrap(),
        {
          pending: "Updating...",
          success: "Updated successfully!",
          error: "Failed to update: " + (error?.data?.message || "Unknown error"),
        }
      );
    } catch (err) {
      toast.error(
        'Failed to update: ' + (err.data?.message || 'Unknown error')
      );
    }
  };

  return { onSubmit, isLoading, isSuccess, isError, error };
};

export default useUpdateHook;
