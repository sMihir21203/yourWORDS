import React from "react";

const Input = ({ icon: Icon, iconSize = 20, label, type = "text", className = "", ...props }) => {
  return (
    <div className="w-full"> {/* Ensuring full width */}
      {label && (
        <label className="font-bold mb-1 pl-1 validator">
          {label}
        </label>
      )}
      <div className="flex border-none outline-none shadow-xs shadow-base-content rounded-lg p-2  w-full">
        <input
          type={type}
          className={`border-0 outline-0 text-md w-full ${className}`} // Ensuring full width
          {...props}
        />
        {Icon && (
          <div className="mr-2 opacity-50">
            <Icon size={iconSize} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
