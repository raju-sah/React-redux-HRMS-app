import { useState } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { Controller } from "react-hook-form";

const TagInput = ({
  label,
  name,
  required,
  className = "",
  placeholder = "Add tags...",
  control,
  errors = {},
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e, onChange, value) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(",", "");
      if (newTag && !value.includes(newTag)) {
        const newTags = [...value, newTag];
        onChange(newTags); // Update form value
      }
      setInputValue("");
    }
  };

  const removeTag = (index, onChange, value) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags); // Update form value
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <div
            className={`border rounded-lg py-1 w-full flex flex-wrap items-center gap-2 border-gray-300 focus-within:border-blue-500 focus-within:border-2 ${
              errors[name] ? "border-red-500 focus-within:border-red-500" : ""
            }`}
          >
            {value.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 text-sm px-2 py-1 rounded-lg flex items-center"
              >
                {tag}
                <RxCross2
                  className="ml-1 cursor-pointer text-red-600"
                  onClick={() => removeTag(index, onChange, value)}
                />
              </div>
            ))}
            <input
              id={name}
              type="text"
              className="flex-grow px-2 border-none focus:outline-none h-8"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, onChange, value)}
              placeholder={value.length === 0 ? placeholder : ""}
              {...props}
            />
          </div>
        )}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};

TagInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

export default TagInput;