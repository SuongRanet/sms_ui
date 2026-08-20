import React, { useState, useEffect } from "react";
import useRole from "../hooks/useRole";
import { Users, Hospital } from "lucide-react";
import StudentSex from "../components/StudentSex";
import StudentAttended from "../components/StudentAttended";
import TotalCard from "../components/custom/TotalCard";
import serverRest from "../services/axios";
import Student_Grade from "../components/Student_Grade";
import DepartmentDistribution from "../components/DepartmentDistribution";

// Controls which stat cards / sections are visible for each role.
const shows = {
    ADMIN: {
        teacher: true,
        student: true,
        class: true,
        parent: true,
    },
    TEACHER: {
        teacher: false,
        student: true,
        class: true,
        parent: false,
    },
    STUDENT: {
        teacher: false,
        student: true,
        class: false,
        parent: false,
    },
    PARENT: {
        teacher: false,
        student: false,
        class: false,
        parent: true, // fixed: parent role should see the parent card
    },
};

const AllCharts = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [parents, setParents] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await serverRest.get("/api/v1/dashboard/admin");
            const data = response.data;
            console.log(data);
            
            setUsers(data);
            setStudents(data.totalStudents);
            setTeachers(data.totalTeachers);
            setParents(data.totalParents);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers();
        }, 400);
        return () => clearTimeout(timeout);
    }, []);

    // Use the REAL logged-in role. Do not override this with any
    // debug/dev tool (e.g. Leva) in production code.
    const { findRole } = useRole();
    const role = findRole();

    // Fallback to an empty object so the app never crashes if role
    // hasn't resolved yet or is an unexpected value.
    const isShow = shows[role] ?? {
        teacher: false,
        student: false,
        class: false,
        parent: false,
    };

    return (
        <div className="flex flex-col ">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {isShow.teacher && (
                    <TotalCard
                        title="Teacher"
                        value={teachers}
                        icon={Hospital}
                        type="teacher"
                    />
                )}
                {isShow.student && role !== "STUDENT" && (
                    <TotalCard
                        title="Student"
                        value={students}
                        icon={Users}
                        type="student"
                    />
                )}
                {isShow.parent && (
                    <TotalCard
                        title="Parent"
                        value={parents}
                        icon={Users}
                        type="parent"
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
                {/* Left Column - Student Info (only for STUDENT role) */}
                <div className="flex flex-col gap-4 md:gap-6 lg:col-span-1">
                    {isShow.student && role === "STUDENT" && (
                        <TotalCard
                            title="Student"
                            value={students}
                            icon={Users}
                            type="student"
                        />
                    )}
                    {isShow.student && role === "STUDENT" && <StudentSex />}
                </div>

                {/* Right Column - Attendance Chart */}
                <div
                    className={`flex w-full ${
                        role === "STUDENT"
                            ? "lg:col-span-3 hidden"
                            : "lg:col-span-4"
                    }`}
                >
                    <StudentAttended />
                </div>
                <div
                    className={`flex w-full lg:col-span-3${role === "STUDENT" ? " hidden" : ""}`}
                >
                    <Student_Grade />
                </div>
                <div
                    className={`flex w-full lg:col-span-1 ${role === "STUDENT" ? " hidden" : ""}`}
                >
                    <DepartmentDistribution />
                </div>
            </div>
        </div>
    );
};

export default AllCharts;
