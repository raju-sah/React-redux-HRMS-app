import React from "react";

export const FormInput = ({
  label,
  register,
  name,
  type = "text",
  errors,
  required = false,
  className,
  defaultValue,
  placeholder
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name)}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full px-2 py-1.5 border rounded-lg focus:border-primary focus:outline-none ${
          errors[name]
            ? "border-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        }`}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};
