import { toast } from "react-toastify"; // Ensure you have react-toastify installed

const usePostHook = (postQuery) => {
  const [postUser, { isLoading, error }] = postQuery();

  const onSubmit = async (data) => {
    await toast.promise(postUser(data).unwrap(), {
      pending: "Saving...",
      success: "Created successfully!",
      error: "Failed to create: " + (error?.data?.message || "Unknown error"),
    });
  };

  return { onSubmit, isLoading, error };
};

export default usePostHook;
