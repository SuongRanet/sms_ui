import React, { useState } from "react";
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
    UserRoundPlus,
    NotebookPen
} from "lucide-react";
import { ButtonLink } from "../custom/ButtonLink";
import { useTranslation } from "react-i18next";
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
        user: true,
        enroll:true
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
    const { t } = useTranslation();
    const isShow = shows[findRole()];
    return (
        <div className="h-full pt-4 relative">
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:mb-4 lg:pb-2" : "border-none "}`}
            >
                <p className="text-sm hidden lg:block px-2 dark:text-gray-600 text-gray-400 ">
                    {t("dashboard.general")}
                </p>
                {isShow.dashboard && (
                    <ButtonLink
                        to="/dashboard"
                        Icon={House}
                        label={t("dashboard.home")}
                        open={open}
                    />
                )}
            </div>
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:pb-2 lg:mb-4" : "border-none"}`}
            >
                <p className="text-sm hidden lg:block px-2 dark:text-gray-600 text-gray-400 ">
                    {t("dashboard.management")}
                </p>
                {isShow.enroll && (
                    <ButtonLink
                        to="/enroolStudnet"
                        Icon={NotebookPen}
                        label={t("dashboard.enrollment")}
                        open={open}
                    />
                )}
                {isShow.teacher && (
                    <ButtonLink
                        to="/teacherList"
                        Icon={GraduationCap}
                        label={t("dashboard.teacher")}
                        open={open}
                    />
                )}
                {isShow.student && (
                    <ButtonLink
                        to="/studentList"
                        Icon={Users}
                        label={t("dashboard.student")}
                        open={open}
                    />
                )}
                {isShow.parent && (
                    <ButtonLink
                        to="/parentList"
                        Icon={UserRound}
                        label={t("dashboard.parent")}
                        open={open}
                    />
                )}
                {isShow.user && (
                    <ButtonLink
                        to="/userList"
                        Icon={User}
                        label={t("dashboard.user")}
                        open={open}
                    />
                )}
                {isShow.createUser && (
                    <ButtonLink
                        to="/createUser"
                        Icon={UserRoundPlus}
                        label="Create User"
                        open={open}
                    />
                )}
            </div>
            <div
                className={` border-none lg:border-gray-300 lg:dark:border-gray-700 pl-2 ${open ? "border-gray-300 dark:border-gray-700  border-b lg:pb-2 lg:mb-4" : "border-none"}`}
            >
                <p className="text-sm hidden lg:block px-2 dark:text-gray-600 text-gray-400 ">
                    {t("dashboard.academic")}
                </p>
                {isShow.class && (
                    <ButtonLink
                        to="/classList"
                        Icon={Building2}
                        label={t("dashboard.class")}
                        open={open}
                    />
                )}
                {isShow.subject && (
                    <ButtonLink
                        to="/subject"
                        Icon={BookOpen}
                        label={t("dashboard.subject")}
                        open={open}
                    />
                )}
                {isShow.schedule && (
                    <ButtonLink
                        to="/schedule"
                        Icon={CalendarDays}
                        label={t("dashboard.schedule")}
                        open={open}
                    />
                )}
                {isShow.attendence && (
                    <ButtonLink
                        to="/attendence"
                        Icon={CalendarCheck2}
                        label={t("dashboard.attendance")}
                        open={open}
                    />
                )}
                {isShow.score && (
                    <ButtonLink
                        to="/score"
                        Icon={Medal}
                        label={t("dashboard.score")}
                        open={open}
                    />
                )}
                {isShow.grade && (
                    <ButtonLink
                        to="/grade"
                        Icon={Hospital}
                        label={t("dashboard.grade")}
                        open={open}
                    />
                )}
            </div>
        </div>
    );
};

export default MenuSideBar;
