import React from "react";
import useRole from "../hooks/useRole";
import { useControls } from "leva";
import { Users, Hospital } from "lucide-react";
import StudentSex from "../components/StudentSex";
import StudentAttended from "../components/StudentAttended";
import useThemeStore from "../stores/useThemeStore";
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
    const { theme } = useThemeStore();

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
                {/* {isShow.teacher && (
                    <>
                        <TotalCard
                            title="Teacher"
                            value={20}
                            icon={Hospital}
                            type="teacher"
                        />

                        <TotalCard
                            title="Student"
                            value={120}
                            icon={Users}
                            type="student"
                        />
                        <TotalCard
                            title="Total class"
                            value={4}
                            icon={Hospital}
                            type="class"
                        />
                        <TotalCard
                            title="Total class"
                            value={4}
                            icon={Hospital}
                            type="class"
                        />
                    </>
                )}
                {isShow.student && role !== "STUDENT" && role !== "ADMIN" && (
                    <TotalCard
                        title="Total class"
                        value={4}
                        icon={Hospital}
                        type="class"
                    />
                )} */}
                {/* {isShow.student && role !== "STUDENT" && (
                    <div className="bg-white1 shadow-sm rounded-lg py-4 md:py-6 p-3 md:p-4 flex gap-3 md:gap-4">
                        <div className="w-[25%] flex items-center justify-center">
                            <div className="flex items-center justify-center bg-sky-100 rounded-2xl h-10 w-10 md:h-13 md:w-13 border-2 border-sky-400">
                                <Users className="h-5 w-5 md:h-6 md:w-6 text-sky-600" />
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="font-bold text-sm md:text-base">
                                    {totalStudent}
                                </div>
                                <div className="text-gray-400 text-xs md:text-sm">
                                    Total Student
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isShow.class && (
                    <div className="bg-white1 shadow-sm rounded-lg py-4 md:py-6 p-3 md:p-4 flex gap-3 md:gap-4">
                        <div className="w-[25%] flex items-center justify-center">
                            <div
                                // className={`flex items-center justify-center bg-green-100 dark:bg-green-800 rounded-2xl h-10 w-10 md:h-13 md:w-13 border-2 border-green-400`}
                                className={`flex items-center justify-center ${theme === "dark" ? "bg-green-800" : "bg-green-100"} rounded-2xl h-10 w-10 md:h-13 md:w-13 border-2 border-green-400`}
                            >
                                <Hospital
                                    className={`h-5 w-5 md:h-6 md:w-6 ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-sm md:text-base">
                                {totalClass}
                            </div>
                            <div className="text-gray-400 text-xs md:text-sm">
                                Total Class
                            </div>
                        </div>
                    </div>
                )} */}
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
                        // <div className="bg-white1 shadow-sm rounded-lg py-4 md:py-6 p-3 md:p-4 flex gap-3 md:gap-4">
                        //     <div className="w-[25%] flex items-center justify-center">
                        //         <div className="flex items-center justify-center bg-sky-100 rounded-2xl h-10 w-10 md:h-13 md:w-13 border-2 border-sky-400">
                        //             <Users className="h-5 w-5 md:h-6 md:w-6 text-sky-600" />
                        //         </div>
                        //     </div>
                        //     <div>
                        //         <div>
                        //             <div className="font-bold text-sm md:text-base">
                        //                 {totalStudent}
                        //             </div>
                        //             <div className="text-gray-400 text-xs md:text-sm">
                        //                 Total Student
                        //             </div>
                        //         </div>
                        //     </div>
                        // </div>
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
        //
        // <div className="flex flex-col gap-6">
        //     <div className="grid grid-cols-4 gap-6">
        //   <div className="bg-white1 shadow-sm rounded-lg py-6 p-4 flex gap-4">
        //     <div className="w-[25%] flex items-center justify-center">
        //       <div className="flex items-center justify-center bg-sky-100 rounded-2xl h-13 w-13 border-2 border-sky-400">
        //         <Users className="h-6 w-6 text-sky-600" />
        //       </div>
        //     </div>
        //     <div>
        //         <div>
        //             <div className="font-bold">120</div>
        //             <div className="text-gray-400">Total Student</div>
        //         </div>
        //     </div>
        //   </div>
        //   <div className="bg-white1 shadow-sm rounded-lg py-6 p-4 flex gap-4">
        //     <div className="w-[25%] flex items-center justify-center ">
        //       <div className="flex items-center justify-center bg-green-100 rounded-2xl h-13 w-13 border-2 border-green-400">
        //         <Hospital className="h-6 w-6 text-green-600" />
        //       </div>
        //     </div>
        //     <div>
        //       <div className="font-bold">4</div>
        //       <div className="text-gray-400">Total Class</div>
        //     </div>
        //   </div>
        // </div>
        // <div className="grid grid-cols-4 gap-6">
        //     <div >
        //         <StudentSex/>
        //     </div>
        //     <div className="col-span-3">
        //         <StudentAttended/>
        //     </div>
        // </div>
        // </div>
        //
    );
};

export default AllCharts;
