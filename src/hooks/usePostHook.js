import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const usePostHook = (postQuery) => {
  const [postUser, { isLoading, isSuccess, isError, error }] = postQuery();

  const onSubmit = async (data) => {
    try {
      await toast.promise(
        postUser(data).unwrap(),
        {
          pending: "Saving...",
          success: "Created successfully!",
          error: "Failed to create: " + (error?.data?.message || "Unknown error"),
        },
      );
    } catch (err) {
      toast.error(
        'Failed to create: ' + (err.data?.message || 'Unknown error')
      );
    }
  };

  return { onSubmit, isLoading, isSuccess, isError, error };
};

export default usePostHook;