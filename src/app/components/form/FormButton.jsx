// FormButton.jsx

const FormButton = ({ isLoading, text, ...props }) => {
  return (
    <input
      type="submit"
      className="bg-primary text-white py-1 px-2 text-sm rounded border hover:bg-transparent  hover:border-primary hover:text-primary cursor-pointer"
      value={isLoading ? "Saving..." : text}
      {...props}
    />
  );
};
export default FormButton;
