export const FormInput = ({label, disable, type, nameId, value, onChange ,enable }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor="lastNameKh" className="text-dark-text/30">
                {label}
            </label>
            <input
                disabled={!disable}
                type={type}
                name={nameId}
                id={nameId}
                className={`${disable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};
