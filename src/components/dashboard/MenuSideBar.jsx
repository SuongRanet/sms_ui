import React from "react";
import useRole from "../../hooks/useRole";
import {
    LayoutDashboard,
    CalendarDays,
    Medal,
    Hospital,
    CalendarCheck2,
    UserRound,
    House,
    GraduationCap,
    User,
    Users,
    Crown,
    BookOpen,
    Building2,
    UserRoundPlus
} from "lucide-react";
import { ButtonLink } from "../custom/ButtonLink";
const shows = {
    ADMIN: {
        dashboard: true,
        schedule: true,
        score: true,
        grade: true,
        attendence: true,
        teacher: true,
        student: true,
        admin: true,
        parent: true,
        class: true,
        subject: true,
        createUser: true,
    },
    TEACHER: {
        dashboard: true,
        kickUser: true,
        promoteUser: false,
    },
    STUDENT: {
        dashboard: true,
    },
    PARENT: {
        dashboard: true,
        kickUser: false,
        promoteUser: false,
    },
};

const MenuSideBar = ({ open }) => {
    const { findRole } = useRole();
    // const role = findRole();

    const isShow = shows[findRole()];

    return (
        <div className="h-full pt-4 relative">
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:mb-4 lg:pb-2" : "border-none "}`}
            >
                <p className="text-sm hidden lg:block px-2 dark:text-gray-600 text-gray-400 ">
                    General
                </p>
                {isShow.dashboard && (
                    <ButtonLink to="/" Icon={House} label="Home" open={open} />
                )}
            </div>
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:pb-2 lg:mb-4" : "border-none"}`}
            >
                <p className="text-sm hidden lg:block px-2 dark:text-gray-600 text-gray-400 ">
                    Management
                </p>

                {isShow.teacher && (
                    <ButtonLink
                        to="/teacher"
                        Icon={GraduationCap}
                        label="Teachers"
                        open={open}
                    />
                )}
                {isShow.student && (
                    <ButtonLink
                        to="/student"
                        Icon={Users}
                        label="Students"
                        open={open}
                    />
                )}
                {isShow.parent && (
                    <ButtonLink
                        to="/parent"
                        Icon={UserRound}
                        label="Parents"
                        open={open}
                    />
                )}
                {isShow.class && (
                    <ButtonLink
                        to="/class"
                        Icon={Building2}
                        label="Classes"
                        open={open}
                    />
                )}
                {isShow.subject && (
                    <ButtonLink
                        to="/subject"
                        Icon={BookOpen}
                        label="Subjects"
                        open={open}
                    />
                )}
                {isShow.schedule && (
                    <ButtonLink
                        to="/schedule"
                        Icon={CalendarDays}
                        label="Schedule"
                        open={open}
                    />
                )}
                {isShow.attendence && (
                    <ButtonLink
                        to="/attendence"
                        Icon={CalendarCheck2}
                        label="Attendence"
                        open={open}
                    />
                )}
                {isShow.createUser && (
                    <ButtonLink
                        to="/create-user"
                        Icon={UserRoundPlus}
                        label="Create User"
                        open={open}
                    />
                )}
            </div>
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:pb-2 lg:mb-4" : "border-none"}`}
            >
                {isShow.score && (
                    <ButtonLink
                        to="/score"
                        Icon={Medal}
                        label="Score"
                        open={open}
                    />
                )}
                {isShow.grade && (
                    <ButtonLink
                        to="/grade"
                        Icon={Hospital}
                        label="Grade"
                        open={open}
                    />
                )}
            </div>
        </div>
    );
};

export default MenuSideBar;
