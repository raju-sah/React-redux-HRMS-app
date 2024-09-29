import PropTypes from "prop-types";
function FormTextArea({
  label,
  required = false,
  name,
  rows = 3,
  className,
  register,
  errors,
  ...props
}) {
  return (
    <div className={`${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        className="w-full px-2 py-1.5 border rounded-lg focus:border-blue-500 focus:border-2 focus:outline-none"
        {...register(name)}
        {...props}
      >
      </textarea>
      {errors && errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
}

FormTextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,
  rows: PropTypes.number,
  defaultValue: PropTypes.string,
  ...PropTypes.shape,
};

export default FormTextArea;
