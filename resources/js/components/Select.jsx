import React from "react";

const Select = ({
  label,
  name,
  onChange,
  value,
  error,
  className,
  menuItems = [], // Expecting menuItems to be passed as a prop
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-1 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        className="bg-gray-50 border border-blue-200 text-gray-900 text-sm rounded-sm focus:outline-none block w-full p-2.5"
      >
        <option value="">Choose an option</option>
        {menuItems.map((item, id) => (
          <option key={id} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
