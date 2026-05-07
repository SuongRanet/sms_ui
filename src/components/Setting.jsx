//-Path: "\vite\src\components\Setting.jsx"
import useThemeStore from "../stores/useThemeStore";
import { useTranslation } from "react-i18next";

function Setting() {
    const { i18n } = useTranslation();
    const { theme, setTheme } = useThemeStore();

    return (
        <>
            <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="light"
                        checked={theme === "light"}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-dark-text">light theme</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="dark"
                        checked={theme === "dark"}
                        onChange={(e) => setTheme(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-dark-text">dark theme</span>
                </label>
            </div>
            {/* Language */}
            <div className="flex gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="en"
                        checked={i18n.language === "en"}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-dark-text">Eng</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="radio"
                        value="th"
                        checked={i18n.language === "th"}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-dark-text">TH</span>
                </label>
            </div>
        </>
    );
}

export default Setting;
