import PropTypes from "prop-types";

function FormInput({
  label,
  register,
  name,
  type = "text",
  errors = {},
  required = false,
  className = "",
  maxDigit = 50,
  ...props
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, { required })}
        id={name}
        type={type}
        className={`w-full px-2 py-1.5 border rounded-lg focus:border-primary focus:outline-none ${
          errors[name]
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
        onInput={(e) => {
          if (type === "number") {
            e.target.value = e.target.value.slice(0, maxDigit);
          }
        }}
       
        {...props}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
  maxDigit: PropTypes.number,
};

export default FormInput;
