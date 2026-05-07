import React from "react";
import { useNavigate } from "react-router";

const Grade = () => {
  const navigate = useNavigate();

  const grades = [
    { name: "Grade 8A", code: "8A" },
    { name: "Grade 8B", code: "8B" },
    { name: "Grade 9C", code: "9C" },
    { name: "Grade 11D", code: "11D" },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Grades</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {grades.map((grade, index) => (
          <div
            key={index}
            className="bg-white1 shadow-sm rounded-lg p-6 cursor-pointer hover:shadow-lg hover:bg-blue-50 transition-all border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Class</p>
                <h2 className="text-2xl font-bold text-gray-800">
                  {grade.name}
                </h2>
              </div>
              <div className="text-3xl text-blue-500">👥</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grade;
