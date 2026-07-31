import React from "react";

const FormSelection = ({
    label,
    disable,
    nameId,
    options = [],
    onChange,
    enable = true,
    selectValue,
}) => {
    return (
        <div className="flex flex-col">
            <label for={nameId}>{label}</label>

            <select value={selectValue} name={nameId} id={nameId} onChange={onChange}
                className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-2 outline-none mb-2 border-gray-300 dark:border-gray-600 bg-gray-bg `}
            >
                {options.map((option,index) => (
                    <option key={index} value={option.value}>
                        {option.text ?? option.value}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelection;
