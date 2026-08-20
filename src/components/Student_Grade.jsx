import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { grade: "Grade 1", semester1: 78, semester2: 81 },
    { grade: "Grade 2", semester1: 82, semester2: 84 },
    { grade: "Grade 3", semester1: 75, semester2: 79 },
    { grade: "Grade 4", semester1: 84, semester2: 86 },
    { grade: "Grade 5", semester1: 88, semester2: 90 },
    { grade: "Grade 6", semester1: 88, semester2: 70 },
    { grade: "Grade 7", semester1: 91, semester2: 87 },
    { grade: "Grade 8", semester1: 87, semester2: 77 },
    { grade: "Grade 9", semester1: 77, semester2: 73 },
    { grade: "Grade 10", semester1: 73, semester2: 71 },
    { grade: "Grade 11", semester1: 71, semester2: 73 },
    { grade: "Grade 12", semester1: 71, semester2: 64 },
];

const Student_Grade = () => {
    return (
        <div className="bg-white1 p-3 rounded-lg shadow-md flex flex-col gap-4 w-full">
            <h2 className="text-lg font-semibold mb-4">
                Average Student Grade
            </h2>
            <div className="w-full h-70">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="grade" />
                        <YAxis
                            domain={[0, 100]}
                            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                        />
                        <Tooltip />
                        <Legend />

                        <Bar
                            dataKey="semester1"
                            name="Semester 1"
                            fill="#3b82f6"
                            radius={[8, 8, 0, 0]}
                        />

                        <Bar
                            dataKey="semester2"
                            name="Semester 2"
                            fill="#fbbf24"
                            radius={[8, 8, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Student_Grade;