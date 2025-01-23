import React from "react";

const InputField = ({
  label,
  name,
  onChange,
  value,
  className,
  placeholder,
  type,
  readOnly,
  required
}) => {
  return (
    <div className={className}>
        <label className="block mb-1 text-sm font-medium text-gray-900">{label}</label>
        <input
          className="bg-gray-50 border border-blue-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-3"
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          readOnly={readOnly}
          required={required}
        />
    </div>
  );
};

export default InputField;
