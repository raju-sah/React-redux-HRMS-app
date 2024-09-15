import PropTypes from "prop-types";
const Checkbox = ({ label, name, register, className = "" }) => {

  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary focus:ring-opacity-50"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
