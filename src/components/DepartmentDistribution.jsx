import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { name: "Computer Science", value: 120 },
    { name: "Business", value: 90 },
    { name: "Engineering", value: 75 },
    { name: "English", value: 60 },
    { name: "Mathematics", value: 45 },
];

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
];

const DepartmentDistribution = () => {
    return (
        <div className="bg-white1 p-3 rounded-lg shadow-md flex flex-col gap-4 w-full">
            <h2 className="text-lg font-semibold mb-4">
                Department Distribution
            </h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DepartmentDistribution;