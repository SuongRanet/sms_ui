import { NavLink, Link } from "react-router-dom";

export const ButtonLink = ({ Icon, label, to, open }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `pl-3 rounded-lg py-2 flex items-center text-sm font-medium transition-colors
                ${
                    isActive
                        ? "bg-gold-accent/10 text-gold-accent"
                        : "hover:bg-gold-accent/10 hover:text-gold-accent"
                }`
            }
        >
            <div className="flex flex-col items-center">
                {Icon && <Icon size={21} />}
                <span className={`${open ? "hidden" : "block"} text-[11px]`}>
                    {label}
                </span>
            </div>
            <h2
                className={`overflow-hidden  ${open ? "max-w-50 ml-5 opacity-100" : "max-w-0 opacity-0"}`}
            >
                {label}
            </h2>
        </NavLink>
    );
};
