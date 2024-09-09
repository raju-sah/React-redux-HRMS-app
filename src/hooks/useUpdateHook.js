import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const useUpdateHook = (updateQuery) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] = updateQuery();

  const onSubmit = async ({ id, ...data }) => {
      await toast.promise(
        updateUser({ id, ...data }).unwrap(),
        {
          pending: "Updating...",
          success: "Updated successfully!",
          error: "Failed to update: " + (error?.data?.message || "Unknown error"),
        }
      );
  };

  return { onSubmit, isLoading, isSuccess, isError, error };
};

export default useUpdateHook;
