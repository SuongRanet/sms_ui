//-Path: "\vite\src\components\Setting.jsx"
import useThemeStore from "../stores/useThemeStore";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";

function Setting() {
    const { i18n } = useTranslation();
    const { theme, setTheme } = useThemeStore();

    return (
        <div className="w-full px-2 pb-2 bg-white1 rounded-b-lg">
            <div className="bg-gray-bg pt-6 pb-4 ">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-dark-text font-medium">Appearance</div>

                    <div className="flex rounded-lg bg-gray-200 dark:bg-gray-700 p-1 w-50">
                        <button
                            onClick={() => setTheme("light")}
                            className={`px-4 py-2 rounded-md items-center gap-2 text-sm flex w-full font-medium transition-all duration-200 ${
                                theme === "light"
                                    ? "bg-white text-gray-900 shadow"
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            }`}
                        >
                            <Sun size={18} /> <span>Light</span>
                        </button>

                        <button
                            onClick={() => setTheme("dark")}
                            className={`px-4 py-2 flex rounded-md gap-2 items-center text-sm w-full font-medium transition-all duration-200 ${
                                theme === "dark"
                                    ? "bg-gray-900 text-white shadow"
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            }`}
                        >
                            <Moon size={18} /> <span>Dark</span>
                        </button>
                    </div>
                </div>
                {/* Language */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-dark-text font-medium">Language</div>

                    <div className="flex rounded-md bg-gray-200 dark:bg-gray-700 p-1 w-62">
                        <label
                            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium text-center transition-all duration-200 ${
                                i18n.language === "en"
                                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
                                    : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <input
                                type="radio"
                                value="en"
                                checked={i18n.language === "en"}
                                onChange={(e) =>
                                    i18n.changeLanguage(e.target.value)
                                }
                                className="hidden"
                            />
                            English
                        </label>
                        <label
                            className={`cursor-pointer px-4 py-2 rounded-md  text-sm font-medium  text-center transition-all duration-200 ${
                                i18n.language === "jp"
                                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
                                    : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <input
                                type="radio"
                                value="jp"
                                checked={i18n.language === "jp"}
                                onChange={(e) =>
                                    i18n.changeLanguage(e.target.value)
                                }
                                className="hidden "
                            />
                            日本語
                        </label>
                        <label
                            className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium  text-center transition-all duration-200 ${
                                i18n.language === "kh"
                                    ? "bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow"
                                    : "text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            <input
                                type="radio"
                                value="kh"
                                checked={i18n.language === "kh"}
                                onChange={(e) =>
                                    i18n.changeLanguage(e.target.value)
                                }
                                className="hidden"
                            />
                            ភាសាខ្មែរ
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
