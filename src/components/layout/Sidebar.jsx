import React from "react";
import { useTranslation } from "react-i18next";
import AdminPanel from "../../components/dashboard/AdminPanel";
import TeacherPanel from "../../components/dashboard/TeacherPanel";
import StudentPanel from "../../components/dashboard/StudentPanel";
import ParentPanel from "../../components/dashboard/ParentPanel";
import MenuSideBar from "../dashboard/MenuSideBar";

const Sidebar = ({ currentRole, open }) => {
    const { t } = useTranslation();

    const panelMap = {
        ADMIN: AdminPanel,
        TEACHER: TeacherPanel,
        STUDENT: StudentPanel,
        PARENT: ParentPanel,
    };

    return (
        <div
            className={` h-full rounded-br-4xl  overflow-hidden flex flex-col z-10`}
        >
            <div>
                {/* {currentRole &&
                    React.createElement(panelMap[currentRole], { open })} */}
                <MenuSideBar open={open} />
            </div>
        </div>
    );
};

export default Sidebar;
