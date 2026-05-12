import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const AdminPanel = ({ open }) => {
    return (
        <div className=" h-full pl-8 pt-6 ">
            <Link to="/" className="hover:text-gold-accent flex items-center text-lg font-medium transition-all duration-300 ease-in-out">
                <LayoutDashboard  size={30}/> <h2 className={`overflow-hidden  ${open ? "max-w-50 ml-5 opacity-100" : "max-w-0 opacity-0"}`}>Dashboard</h2>
            </Link>
            <hr className="text-gray-700 " />
        </div>
    );
};

export default AdminPanel;
