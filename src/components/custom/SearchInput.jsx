import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const SearchInput = ({ value, onChange, placeholder }) => {
    const [query, setQuery] = useState(value ?? "");
    const { t } = useTranslation();

    const handleChange = (e) => {
        setQuery(e.target.value);
        onChange?.(e.target.value);
    };

    const handleClear = () => {
        setQuery("");
        onChange?.("");
    };

    return (
        <div className="relative w-full max-w-xs">
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
            />

            <input
                type="search"
                name="search"
                id="search"
                value={query}
                onChange={handleChange}
                placeholder={placeholder ?? t("table.search")}
                className="w-full bg-gray-bg text-dark-text placeholder:opacity-50 text-sm rounded-lg pl-9 pr-8 py-2 border border-transparent focus:border-primary-blue focus:bg-white1 focus:outline-none transition-colors [&::-webkit-search-cancel-button]:appearance-none"
            />

            {query && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-70"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
};

export default SearchInput;
