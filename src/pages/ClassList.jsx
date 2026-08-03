import React from "react";
import SearchInput from "../components/custom/SearchInput";
import ClassCard from "../components/custom/ClassCard";

const ClassList = () => {
    return (
        <div className="">
            <div className="mb-4 bg-white1 p-4 rounded-lg">
                <SearchInput />
            </div>

            <div className="grid grid-cols-7 gap-4 justify-center">
                {Array.from({ length: 21 }).map((_, index) => (
                <ClassCard key={index} />
            ))}
            </div>
        </div>
    );
};

export default ClassList;
