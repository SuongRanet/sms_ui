//-Path: "\vite\src\components\Providers.jsx"
import { Leva } from "leva";
import { useEffect } from "react";
import useThemeStore from "../../stores/useThemeStore";

function Providers({ children }) {
    const { theme } = useThemeStore();

    useEffect(() => {
        const html = window.document.documentElement;
        if (theme === "dark") html.classList.add("dark");
        else html.classList.remove("dark");
    }, [theme]);

    return (
        <>
            <Leva hidden />
            {children}
        </>
    );
}

export default Providers;
