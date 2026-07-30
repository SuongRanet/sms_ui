import React from "react";
import { Bell, Search } from "lucide-react";
import useAuthStore from "../../stores/useAuthStore";
import Dropdown from "../custom/Dropdown";
import { useState } from "react";
import { ChevronsLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

const Header = ({ currentRole, setOpen, open ,onClose}) => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const [isOpenSetting, setIsOpenSetting] = useState(false);
    const handleOpen = () => setOpen((prev) => !prev);

    return (
        <div className="flex items-center justify-between gap-3 w-full pl-2">
            <div
                className={`flex items-center justify-center duration-500 gap-2`}
            >
                {/* <button
                    onClick={handleOpen}
                    className={`${open ? "rotate-180" : " "}  rounded-full p-1 hover:bg-gold-accent/20 duration-400 ease-in-out text-dark-text hover:text-gold-accent cursor-pointer transition-transform `}
                >
                    <ChevronsLeft size={34} />
                </button> */}
                <div className="flex items-center justify-start gap-2">
                    <img
                        // src="src/assets/dydy.jpg"
                        src="src/assets/logo.png"
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                    />
                    <h1 className="text-2xl font-bold text-center hidden sm:block">
                        {t("dashboard.title")}
                    </h1>
                </div>
            </div>
            {/* <div className=" items-center bg-gray-bg rounded-md px-2 hidden md:flex ">
                <Search className="text-gray-500" />
                <input
                    type="search"
                    name=""
                    id=""
                    className="w-sm md-md lg:lg p-2  outline-0 px-3"
                    placeholder="Search..."
                />
            </div> */}
            <div className="flex items-center justify-end gap-1 lg:gap-3">
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
                <Dropdown onClose={() => setIsOpenSetting(false)} />
            </div>
        </div>
    );
};

export default Header;
