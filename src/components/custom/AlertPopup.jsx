import React from "react";

function AlertPopup({
    open,
    onClose,
    title,
    description,
    icon,
    cancelButtonIcon,
    onConfirm,
    okayButtonText,
    cancelButtonText,
    btnColor,
    btnColorHover,
}) {
    return open ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
                className="absolute bg-black/50 top-0 left-0 w-full h-full justify-center items-center"
                onClick={onClose}
            ></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-gray-bg rounded-lg shadow-lg w-110 h-80 justify-center ">
                {/* icon */}
                <div className="flex justify-center mb-4 animate-bounce">
                    {icon}
                </div>
                {/* text */}
                <div className="justify-center mb-4">
                    <h3 className="text-lg font-bold flex justify-center">
                        {title}
                    </h3>
                    <p className="text-gray-600 flex justify-center">
                        {description}
                    </p>
                </div>
                {/* button */}
                <div className="flex justify-center mb-4 gap-6">
                    <button
                        className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        {cancelButtonText}
                    </button>
                    <button
                        className={`${btnColor} ${btnColorHover} text-white font-bold py-2 px-4 rounded`}
                        onClick={onConfirm}
                    >
                        {okayButtonText}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}
export default AlertPopup;
