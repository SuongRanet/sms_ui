import React, { useState, useEffect } from "react";
import useRole from "../hooks/useRole";
import { useControls } from "leva";
import { Users, Hospital } from "lucide-react";
import StudentSex from "../components/StudentSex";
import StudentAttended from "../components/StudentAttended";
import TotalCard from "../components/custom/TotalCard";
import serverRest from "../services/axios";

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
    const [error, setError] = useState(null);
    const [totalTeacher, setTotalTeacher] = useState(0);
    const [totalStudent , setTotalStudent] = useState(0)
    const fetchTeacher = async () => {
        try {
            const response = await serverRest.post(`/api/v1/teachers/search`, {
                keyword: "",
                departmentId: 0,
                sex: "",
                hiredDate: "",
                page: "",
                size: "",
                sortBy: "id",
                direction: "asc",
            });
            const data = response;
            setTotalTeacher(data.data.total || 0);
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        } finally {
        }
    };
    const fetchStudent = async () => {
        setError(null);
        try {
            const response = await serverRest.post(`/api/v1/students/search`, {
                keyword: "",
                province: "",
                gender: "",
                fullNameKh: "",
                gradeLevel: "",
                classId: "",
                enrolledFrom: "",
                enrolledTo: "",
                page: 0,
                size: 10,
                sortBy: "id",
                direction: "asc",
            });
            const data = response;
            setTotalStudent(data.data.total || 0);
            console.log(data.data.total)
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        }};
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchTeacher();
            fetchStudent();
        }, 400);
        return () => clearTimeout(timeout);
    });
    const { findRole } = useRole();
    // const role = findRole();
    const { role } = useControls({
        role: {
            value: findRole(),
            options: ["ADMIN", "TEACHER", "STUDENT", "PARENT"],
        },
    });
    // console.log("Role found", role);
    const isShow = shows[role];

    return (
        <div className="flex flex-col gap-6">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {isShow.teacher && (
                    <TotalCard
                        title="Teacher"
                        value={totalTeacher}
                        icon={Hospital}
                        type="teacher"
                    />
                )}
                {isShow.student && role !== "STUDENT" && (
                    <TotalCard
                        title="Student"
                        value={totalStudent}
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
