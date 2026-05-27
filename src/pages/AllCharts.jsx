import React from "react";
import useRole from "../hooks/useRole";
import { useControls } from "leva";
import { Users, Hospital } from "lucide-react";
import StudentSex from "../components/StudentSex";
import StudentAttended from "../components/StudentAttended";
import TotalCard from "../components/custom/TotalCard";

const shows = {
    ADMIN: {
        teacher: true,
        student: true,
        class: true,
    },
    TEACHER: {
        teacher: false,
        student: true,
        class: true,
    },
    STUDENT: {
        teacher: false,
        student: true,
        class: false,
    },
    PARENT: {
        teacher: false,
        student: false,
        class: false,
    },
};
// pnpm add leva

const AllCharts = () => {
    const { findRole } = useRole();
    // const role = findRole();
    const { role } = useControls({
        role: {
            value: findRole(),
            options: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
    });
    console.log("Role found", role);
    const isShow = shows[role];

    const tolalTeacher = 20;
    const totalStudent = 120;
    const totalClass = 4;

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {isShow.teacher && (
                    <TotalCard
                        title="Teacher"
                        value={20}
                        icon={Hospital}
                        type="teacher"
                    />
                )}
                {isShow.student && role !== "STUDENT" && (
                    <TotalCard
                        title="Student"
                        value={120}
                        icon={Users}
                        type="student"
                    />
                )}
                {isShow.class && (
                    <TotalCard
                        title="Total class"
                        value={4}
                        icon={Hospital}
                        type="class"
                    />
                )}
            </div>

            {/* Charts Section - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Left Column - Student Info */}
                <div className="flex flex-col gap-4 md:gap-6 lg:col-span-1">
                    {isShow.student && role === "STUDENT" && (
                        <TotalCard
                            title="Total class"
                            value={4}
                            icon={Hospital}
                            type="class"
                        />
                    )}
                    <StudentSex />
                    {/* <StudentSex /> */}
                </div>

                {/* Right Column - Attendance Chart */}
                <div className="flex w-full lg:col-span-3">
                    <StudentAttended />
                </div>
            </div>
        </div>
    );
};

export default AllCharts;
