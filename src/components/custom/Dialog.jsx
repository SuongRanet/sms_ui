import React from "react";
import { X } from "lucide-react";

function Dialog({ open, onClose, title, children }) {
    return open ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
                className="absolute bg-black/50 top-0 left-0 w-full h-full"
                onClick={onClose}
            />
            <div className="absolute top-50% left-50% transform-(-50%,-50%) flex flex-col bg-gray-bg text-dark-text  rounded-xl shadow-xl h-60  w-100  ​ p-2">
                <div className="flex items-start justify-between px-4 py-2 bg-white1 text-dark-text rounded-t-xl">
                    <h1 className="text-dark-text">{title}</h1>
                    <button
                        className="text-dark-text font-bold text-xl"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                <div className="">{children}</div>
            </div>
        </div>
    ) : null;
}

export default Dialog;
