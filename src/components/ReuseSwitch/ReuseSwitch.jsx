import React from 'react';

const ReuseSwitch = ({ id, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className="block bg-gray-600 w-10 h-6 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${
            checked ? "transform translate-x-full bg-blue-500" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ReuseSwitch;
