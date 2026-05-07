//-Path: "\client\src\components\custom\Dropdown.jsx"
import Dialog from "./Dialog";
import Setting from "../Setting";
import { useState } from "react";
import serverRest from "../../services/axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import { User, Settings, LogOut } from "lucide-react";

const Dropdown = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSetting, setIsOpenSetting] = useState(false);

    const handleLogout = async () => {
        logout();
        try {
            // Perform any additional cleanup if necessary
            const response = await serverRest.post("/api/v1/auth/logout");
            console.log("Logout successful:", response.data);
        } catch (error) {
            console.error("Logout failed:", error);
        }
        navigate("/");
    };

    return (
        <div className="relative">
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                className="dropbtn hover:shadow-lg hover:ring-offset-white hover:ring-4 ring-gold-accent ring-offset-2 shadow-gold-accent/50 transition-shadow duration-300 h-9 w-9 rounded-full flex items-center justify-center cursor-pointer"
            >
                <img
                    // src="src/assets/dydy.jpg"
                    src="https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/05F0/production/_106002510_uncletufighting.jpg.webp"
                    alt=""
                    className="h-8 w-8 rounded-full object-cover"
                />
            </div>
            <div
                className={`-left-21 top-11 w-30 rounded-sm shadow-[0_0_15px_-3px_rgba(0,0,0,0.1),0_0_6px_-4px_rgba(0,0,0,0.1)] bg-white1 overflow-hidden flex flex-col dropdown-content ${isOpen ? "block" : "hidden"} absolute `}
            >
                <button
                    href="#"
                    className="flex duration-300 items-center gap-1 hover:bg-gold-accent dark:hover:bg-gold-accent/50 p-2"
                >
                    <span>
                        <User className="h-4 w-4" />
                    </span>
                    Profile
                </button>
                <button
                    className="flex duration-300 items-center gap-1 hover:bg-gold-accent dark:hover:bg-gold-accent/50 p-2"
                    onClick={() => setIsOpenSetting((prev) => !prev)}
                >
                    <span>
                        <Settings className="h-4 w-4" />
                    </span>
                    Setting
                </button>
                <button
                    className="flex duration-300 items-center gap-1 hover:bg-gold-accent dark:hover:bg-gold-accent/50 p-2"
                    onClick={() => handleLogout()}
                >
                    <span>
                        <LogOut className="h-4 w-4" />
                    </span>
                    Logout
                </button>
            </div>
            <Dialog
                title="Setting"
                open={isOpenSetting}
                onClose={() => setIsOpenSetting(false)}
            >
                <Setting />
            </Dialog>
        </div>
    );
};

export default Dropdown;
