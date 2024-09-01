import React from "react";

const Checkbox = ({ label, name, register, setValue, className = "" }) => {
  const handleChange = (e) => {
    setValue(name, e.target.checked ? 1 : 0);
  };

  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <input
        type="checkbox"
        id={name}
        {...register(name)}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary focus:ring-opacity-50"
      />
      <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
