import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";

const TagInput = ({
  label,
  name,
  required,
  className = "",
  placeholder = "Add tags...",
  register,
  errors = {},
  ...props
}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { onChange, ...rest } = register(name, { required });

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  const handleKeyDown = (e) => {
    if ((e.key === "," || e.key === "Enter") && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().replace(",", "");
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`border rounded-lg py-1 w-full flex flex-wrap items-center gap-2 border-gray-300 focus-within:border-blue-500 focus-within:border-2 ${
          errors[name] ? "border-red-500 focus-within:border-red-500" : ""
        }`}
      >
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 text-sm px-2 py-1 rounded-lg flex items-center"
          >
            {tag}
            <RxCross2
              className="ml-1 cursor-pointer text-red-600"
              onClick={() => removeTag(index)}
            />
          </div>
        ))}
        <input
          id={name}
          type="text"
          className="flex-grow px-2 border-none focus:outline-none h-8"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          {...rest}
          {...props}
        />
      </div>
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
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default TagInput;