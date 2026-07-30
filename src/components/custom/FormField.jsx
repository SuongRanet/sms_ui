import React from "react";

const FormField = ({
    label,
    id,
    name,
    type = "text",
    value,
    onChange,
    disabled,
    fullWidth = false,
    required = false,
    className = "",
}) => {
    return (
        <>
            <label
                htmlFor={id}
                className={`text-dark-text/30 ${fullWidth ? "col-span-2" : ""}`}
            >
                {label}
            </label>
            <input
                disabled={disabled}
                type={type}
                name={name || id}
                id={id}
                className={`${fullWidth ? "col-span-2" : ""} border-2 rounded-md p-1.5 outline-none mb-1 text-sm border-gray-300 dark:border-gray-600 ${className}`}
                value={value ?? ""}
                onChange={onChange}
                required={required}
            />
        </>
    );
};

export default FormField;
