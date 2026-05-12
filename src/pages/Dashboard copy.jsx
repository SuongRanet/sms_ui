import React from "react";
import useRole from "../hooks/useRole";
import AdminPanel from "../components/dashboard/AdminPanel";
import TeacherPanel from "../components/dashboard/TeacherPanel";
import StudentPanel from "../components/dashboard/StudentPanel";
import ParentPanel from "../components/dashboard/ParentPanel";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import {
    LayoutDashboard,
    Award,
    Hospital,
    CalendarCheck2,
    CalendarDays,
    Bell,
    Search
} from "lucide-react";
import Dropdown from "../components/custom/Dropdown";
import { useTranslation } from "react-i18next";

const panelMap = {
    ADMIN: AdminPanel,
    TEACHER: TeacherPanel,
    STUDENT: StudentPanel,
    PARENT: ParentPanel,
};

const Dashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { findRole } = useRole();
    const { user } = useAuthStore();

    const currentRole = findRole();

    return (
        <div className="w-full h-screen  flex bg-gray-bg">
            {/* left */}
            <div className="bg-white1 h-full rounded-br-4xl w-0 overflow-hidden">
                <h1 className="text-2xl font-bold text-center py-4">
                    {t("dashboard.title")}
                </h1>

                {currentRole && React.createElement(panelMap[currentRole])}
            </div>
            {/* right */}
            <div className="grid grid-cols-2 grid-rows-[9%_91%] md:grid-rows-[12%_88%] lg:grid-rows-[11%_89%]">
                <div className="col-span-2 bg-white1 p-2 pr-6 flex items-center ">
                    {/* header  */}
                    <div className="flex items-center justify-between gap-3 w-full pl-7">
                        <div className="flex items-center bg-gray-bg rounded-md px-2 ">
                            <Search className="text-gray-500"/>
                            <input
                                type="search"
                                name=""
                                id=""
                                className="w-lg p-2  outline-0 px-3"
                                placeholder="Search..."
                            />
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <div>
                                <Bell className="h-5 w-5 text-gray-500 hover:text-gold-accent cursor-pointer" />
                            </div>
                            <div>
                                <h1 className="text-sm font-bold text-gray-400 hidden lg:block">
                                    {user.email}
                                </h1>
                                <p className="text-xs text-gray-500 hidden lg:block">
                                    {currentRole.charAt(0).toUpperCase() +
                                        currentRole.slice(1).toLowerCase()}
                                </p>
                            </div>
                            <Dropdown />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 p-8 pl-8 bg-gray-bg">
                    {/* content */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;



// //-Path: "\src\pages\Dashboard.jsx"
// import React, { useState } from "react";
// import useRole from "../hooks/useRole";
// import AdminPanel from "../components/dashboard/AdminPanel";
// import TeacherPanel from "../components/dashboard/TeacherPanel";
// import StudentPanel from "../components/dashboard/StudentPanel";
// import ParentPanel from "../components/dashboard/ParentPanel";
// import { Outlet, useNavigate } from "react-router-dom";
// import useAuthStore from "../stores/useAuthStore";
// import {
//     LayoutDashboard,
//     Award,
//     Hospital,
//     CalendarCheck2,
//     CalendarDays,
//     Bell,
//     Search,
//     ChevronsLeft,
// } from "lucide-react";
// import Dropdown from "../components/custom/Dropdown";
// import { useTranslation } from "react-i18next";

// const panelMap = {
//     ADMIN: AdminPanel,
//     TEACHER: TeacherPanel,
//     STUDENT: StudentPanel,
//     PARENT: ParentPanel,
// };

// const Dashboard = () => {
//     const [open, setOpen] = useState(true);
//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const { findRole } = useRole();
//     const { user } = useAuthStore();

//     const currentRole = findRole();

//     return (
//         <div className="  w-full h-screen grid grid-cols-[50%-50%]  sm:grid-cols-[50%_50%] bg-gray-bg xl:grid-cols-[15%_85%] ">
//             {/* left */}
//             <div
//                 className={`duration-400 ease-in-out bg-red-900 h-full flex flex-col  rounded-br-4xl  overflow-hidden relative  ${open ? " px-3 " : "px-5.5"}`}
//             >
//                 <div className="flex items-center h-22 justify-between pl-2 ">
//                     {/* logo */}
//                     <div className={`flex items-center gap-1.5`} >
//                         <img
//                             // src="src/assets/dydy.jpg"
//                             src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/05F0/production/_106002510_uncletufighting.jpg.webp"
//                             alt=""
//                             className=" h-8 w-8 rounded-full object-cover"
//                         />
//                         <h1
//                             className={`text-2xl font-bold text-center ${open ? "w-full" : "w-0"} overflow-hidden transition-[width] duration-400 ease-in-out`}
//                         >
//                             {t("dashboard.title")}
//                         </h1>
//                     </div>
//                 </div>
//                 {currentRole && React.createElement(panelMap[currentRole])}
//             </div>
//             {/* right */}
//             <div className="w-full grid grid-rows-[9%_91%] md:grid-rows-[12%_88%] lg:grid-rows-[11%_89%]" >
//                 <div className="col-span-2 bg-white1 p-2 pr-6 flex items-center ">
//                     {/* header  */}
//                     <div className="flex items-center justify-between gap-3 w-full pl-7">
//                         <div className="flex items-center bg-gray-bg rounded-md px-2 ">
//                             <Search className="text-gray-500" />
//                             <input
//                                 type="search"
//                                 name=""
//                                 id=""
//                                 className="w-lg p-2  outline-0 px-3"
//                                 placeholder="Search..."
//                             />
//                         </div>
//                         <div className="flex items-center justify-end gap-3">
//                             <div>
//                                 <Bell className="h-5 w-5 text-gray-500 hover:text-gold-accent cursor-pointer" />
//                             </div>
//                             <div>
//                                 <h1 className="text-sm font-bold text-gray-400 hidden lg:block">
//                                     {user.email}
//                                 </h1>
//                                 <p className="text-xs text-gray-500 hidden lg:block">
//                                     {currentRole.charAt(0).toUpperCase() +
//                                         currentRole.slice(1).toLowerCase()}
//                                 </p>
//                             </div>
//                             <Dropdown />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-span-2 p-8 pl-8 bg-gray-bg">
//                     {/* content */}
//                     <Outlet />
//                 </div>
//             </div>
            
//         </div>
//     );
// };

// export default Dashboard;
