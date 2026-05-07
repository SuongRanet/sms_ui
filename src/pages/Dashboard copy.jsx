import React from "react";
import AdminPanel from "../components/dashboard/AdminPanel";
import TeacherPanel from "../components/dashboard/TeacherPanel";
import StudentPanel from "../components/dashboard/StudentPanel";
import ParentPanel from "../components/dashboard/ParentPanel";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Award,
  Hospital,
  CalendarCheck2,
  CalendarDays,
  Bell,
} from "lucide-react";

const panelMap = {
  ADMIN: AdminPanel,
  TEACHER: TeacherPanel,
  STUDENT: StudentPanel,
  PARENT: ParentPanel,
};

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("roles");
    localStorage.removeItem("token");
    navigate("/");
  };
  
  const roles = JSON.parse(localStorage.getItem("roles")) || [];

  console.log("User roles:", roles);

  const roleAccess = {
    ADMIN: ["ADMIN"],
    TEACHER: ["TEACHER"],
    STUDENT: ["STUDENT"],
    PARENT: ["PARENT"],
  };

  const currentRole = ["ADMIN", "TEACHER", "STUDENT", "PARENT"].find((r) =>
    roles.includes(r),
  );

  const visiblePanels = roleAccess[currentRole] || [];

  return (
    <div className="w-full h-screen  grid grid-cols-[16%_84%] bg-gray-bg xl:grid-cols-[14%_86%]">
      {/* left */}
      <div className="bg-red-600 h-full">
        <h1 className="text-2xl font-bold text-center py-4">Dashboard</h1>
        <hr />
        {visiblePanels.map((role) => {
          const PanelComponent = panelMap[role];
          return PanelComponent ? <PanelComponent key={role} /> : null;
        })}
      </div>
      {/* right */}
      <div className="grid grid-cols-2 grid-rows-[9%_93%] md:grid-rows-[12%_88%] lg:grid-rows-[13%_87%]">
        <div className="col-span-2 bg-white1  border-b-2 border-gray-200 p-2 flex items-center justify-end gap-3 pr-6">
          {/* header  */}
          <div>
            <Bell className="h-5 w-5 text-gray-500 hover:text-gold-accent cursor-pointer" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-400 hidden lg:block">
              Teacher@gmail.com
            </h1>
            <p className="text-xs text-gray-500 hidden lg:block">Teacher</p>
          </div>
          <div className="hover:bg-gold-accent h-9 w-9 rounded-full flex items-center justify-center cursor-pointer">
            <img
              src="src/assets/dydy.jpg"
              alt=""
              className="h-8 w-8 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="col-span-2 p-8 pl-12 bg-gray-bg">
          {/* content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
