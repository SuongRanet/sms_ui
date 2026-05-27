import { Link } from "react-router-dom";

export const ButtonLink = ({ Icon, label, to, open }) => {
    return (
        
            <Link
                to={to}
                className={`${open ? "pl-3 " : "justify-center "} hover:bg-gold-accent/10 rounded-lg hover:text-gold-accent py-2 flex items-center text-sm font-medium`}
            >
                <div className="flex flex-col items-center">
                    {Icon && <Icon size={21} />}
                    <span
                        className={`${open ? "hidden" : "block"} text-[11px]`}
                    >
                        {label}
                    </span>
                </div>
                <h2
                    className={`overflow-hidden  ${open ? "max-w-50 ml-5 opacity-100" : "max-w-0 opacity-0"}`}
                >
                    {label}
                </h2>
            </Link>
    );
};
