import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const PasswordInput = ({
  label,
  register,
  validationRules,
  name,
  errors,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {validationRules?.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          {...register(name, validationRules)}
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={label}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
            errors[name]
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500"
          }`}
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {showPassword ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
        </button>
      </div>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};
