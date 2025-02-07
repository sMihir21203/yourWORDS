import React from "react";

const Input = ({ icon: Icon,
  iconSize = 20,
  label,
  type = "text",
  className = "",
  ...props
}) => {
  return (
    <div className="w-70">
      {label && (
        <label className="font-bold mb-1 pl-1 validator">
          {label}
        </label>
      )}
      <div className="flex items-center border rounded-lg p-2 input  input-secondary">
        {Icon && (
          <div className="mr-2 opacity-50">
            <Icon size={iconSize} />
          </div>
        )}
        <input
          type={type}
          className={`border-0 outline-0 text-md ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
