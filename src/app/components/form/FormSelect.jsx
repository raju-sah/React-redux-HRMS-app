import { useController } from "react-hook-form";
import Select from "react-select";
import PropTypes from "prop-types";

function FormSelect({
  label,
  name,
  control,
  required = false,
  className = "",
  options,
  isMulti = false,
}) {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    defaultValue: isMulti ? [] : '',
  });

  const handleChange = (selectedOption) => {
    if (isMulti) {
      const newValue = selectedOption ? selectedOption.map(option => option.value) : [];
      onChange(newValue);
    } else {
      const newValue = selectedOption ? selectedOption.value : null;
      onChange(newValue);
    }
  };

  const getCurrentValue = () => {
    if (isMulti) {
      return options.filter(option => value.includes(option.value));
    } else {
      return options.find(option => option.value === value) || null;
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        inputRef={ref}
        options={options}
        isMulti={isMulti}
        value={getCurrentValue()}
        onChange={handleChange}
        className="basic-select"
        classNamePrefix="select"
        isClearable={true}
      />
      {error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
}

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  isMulti: PropTypes.bool,
};

export default FormSelect;