import React from "react";

const CustomButton = ({
  label = "Save",
  onClick,
  paddingX = "px-4",
  paddingY = "py-1",
  height,
  width,
  color="bg-violet-600",
  textColor = "text-white",
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${color} hover:bg-blue-700 ${textColor} shadow-lg
         font-bold ${paddingY} ${paddingX} rounded
      focus:outline-none focus:shadow-outline 
      transition duration-300 ease-in-out 
      ${height ? `h-${height}` : ""} ${width ? `w-${width}` : ""}`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
