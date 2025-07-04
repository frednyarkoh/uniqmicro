import React, { useState, useEffect, useRef } from "react";

function ImageUpload({ label, initialUrl, onChange }) {
  const [preview, setPreview] = useState(initialUrl || null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (initialUrl) {
      setPreview(initialUrl);
    }
  }, [initialUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onChange?.(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full bg-gray-100 rounded-md mt-4 py-4 cursor-pointer"
      onClick={handleClick}
    >
      {preview && (
        <img
          src={preview}
          alt={label}
          className="w-auto h-24 mb-2 object-cover rounded-lg py-2"
        />
      )}
      <p className="text-sm text-center font-medium text-gray-700">
        {preview ? `Change ${label}` : `Click to upload ${label}`}
      </p>
      <p className="text-xs text-gray-500 text-center">
        Only JPG, PNG, and JPEG files
      </p>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageUpload;
