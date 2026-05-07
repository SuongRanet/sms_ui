import React from "react";

function Dialog({ open, onClose, title, children }) {
  return open ? (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute bg-black/50 top-0 left-0 w-full h-full"
        onClick={onClose}
      />
      <div className="absolute top-50% left-50% transform-(-50%,-50%) flex flex-col bg-gray-bg p-4 rounded shadow-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-dark-text">{title}</h1>
          <button className="p-5 text-dark-text" onClick={onClose}>
            x
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  ) : null;
}

export default Dialog;
