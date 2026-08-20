import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

const data = [
    { month: "Jan", attendance2025: 72, attendance2026: 85 },
    { month: "Feb", attendance2025: 50, attendance2026: 88 },
    { month: "Mar", attendance2025: 53, attendance2026: 92 },
    { month: "Apr", attendance2025: 65, attendance2026: 90 },
    { month: "May", attendance2025: 74, attendance2026: 95 },
    { month: "Jun", attendance2025: 43, attendance2026: 91 },
    { month: "Jul", attendance2025: 64, attendance2026: 96 },
    { month: "Aug", attendance2025: 55, attendance2026: 70 },
    { month: "Sep", attendance2025: 60, attendance2026: 75 },
    { month: "Oct", attendance2025: 65, attendance2026: 80 },
    { month: "Nov", attendance2025: 35, attendance2026: 85 },
    { month: "Dec", attendance2025: 80, attendance2026: 90 },
];

const StudentAttended = () => {
    return (
        <div className="bg-white1 p-3 rounded-lg shadow-md flex flex-col gap-4 w-full">
            <h1 className="text-lg font-semibold">
                Student Attendance by Month
            </h1>

            <div className="h-70 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="gradient2025"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3B82F6"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>

                            <linearGradient
                                id="gradient2026"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#10B981"
                                    stopOpacity={0.4}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#10B981"
                                    stopOpacity={0.05}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Legend />

                        <Area
                            type="monotone"
                            dataKey="attendance2025"
                            name="2025"
                            stroke="#3B82F6"
                            fill="url(#gradient2025)"
                        />

                        <Area
                            type="monotone"
                            dataKey="attendance2026"
                            name="2026"
                            stroke="#10B981"
                            fill="url(#gradient2026)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StudentAttended;
