import PropTypes from "prop-types";
const FormButton = ({ isLoading, text, disabled, ...props }) => {
  return (
    <button
      type="submit"
      className={`py-1 px-2 text-sm rounded border ${
        isLoading
          ? 'bg-gray-500 text-gray-300 border-gray-500 cursor-not-allowed'
          : 'bg-primary text-white hover:bg-transparent hover:border-primary hover:text-primary cursor-pointer'
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Saving..." : text}
    </button>
  );
};

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};
export default FormButton;
