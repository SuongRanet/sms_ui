import React, { useMemo } from "react";
import useRole from "../hooks/useRole";
import { useState,} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Award,
    Hospital,
    CalendarCheck2,
    CalendarDays,
    Bell,
    Search,
    ChevronsLeft,
} from "lucide-react";
import Dropdown from "../components/custom/Dropdown";
import { useTranslation } from "react-i18next";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const Dashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { findRole } = useRole();
    const [open, setOpen] = useState(true);
    const currentRole = useMemo(() => findRole(), []);
    return (
        <div
            className={`w-full h-screen grid grid-cols-[12%_88%] bg-gray-bg md:grid-cols-[12%_88%] relative ${open ? "grid-cols-[16%_84%] lg:grid-cols-[17%_83%]" : "lg:grid-cols-[4%_96%]"} duration-400 ease-in-out`}
        >
            <div className="col-span-2 p-2 pr-6 flex items-center ">
                {/* header  */}
                <Header
                    currentRole={currentRole}
                    setOpen={setOpen}
                    open={open}
                />
            </div>
            {/* Sidebar */}
            <Sidebar currentRole={currentRole} open={open} />
            {/* right */}
            <div className="grid grid-cols-2 grid-rows-[9%_91%] md:grid-rows-[12%_88%] lg:grid-rows-[11%_89%]">
                <div className=" overflow-y-auto w-full col-span-2 h-162">
                    <div className="p-8 pl-8">
                        {/* content */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
