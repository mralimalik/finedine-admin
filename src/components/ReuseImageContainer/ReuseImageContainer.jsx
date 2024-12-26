import React, { useState, useEffect } from "react";

const ReuseImageContainer = ({ imageUrl, onImageChange }) => {
  const [image, setImage] = useState(imageUrl);

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Business Logo
      </label>
      <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
        {image ? (
          <img src={image} alt="Logo" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Pick Image
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
      {image && (
        <button
          type="button"
          onClick={handleImageRemove}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ReuseImageContainer;
