import React from "react";

export const FormInput = ({
  label,
  register,
  validationRules,
  name,
  type = "text",
  errors,
  className,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {validationRules?.required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...register(name, validationRules)}
        id={name}
        type={type}
        placeholder={label}
        className={`w-full px-3 py-2 border rounded-lg focus:border-primary focus:outline-none ${
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