//-Path: "\vite\src\components\Setting.jsx"
import useThemeStore from "../stores/useThemeStore";
import { useTranslation } from "react-i18next";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

function Setting() {
    const { i18n } = useTranslation();
    const { theme, setTheme } = useThemeStore();

    const lang = [
        { value: "en", label: "English" },
        { value: "jp", label: "日本語" },
        { value: "kh", label: "ភាសាខ្មែរ" },
    ];
    const sunMood = [
        {
            value: "light",
            label: "Light",
            icon: <Sun size={18} />,
        },
        {
            value: "dark",
            label: "Dark",
            icon: <Moon size={18} />,
        },
    ];

    return (
        <div className="w-full px-2 pb-2 bg-white1 rounded-b-lg">
            <div className="bg-gray-bg pt-6 pb-4 ">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-dark-text font-medium">Appearance</div>

                    <div className="flex rounded-lg bg-gray-200 dark:bg-gray-700 p-1 w-50">
                        {sunMood.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setTheme(item.value)}
                                className="relative flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
                            >
                                {theme === item.value && (
                                    <motion.div
                                        layoutId="theme-switch"
                                        className={`absolute inset-0 rounded-md shadow ${
                                            theme === "light"
                                                ? "bg-white"
                                                : "bg-gray-900"
                                        }`}
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                        }}
                                    />
                                )}

                                <motion.div
                                    className={`relative z-10 flex items-center gap-2 ${
                                        theme === item.value
                                            ? theme === "light"
                                                ? "text-gray-900"
                                                : "text-white"
                                            : "text-gray-500 dark:text-gray-300"
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        rotate: theme === item.value ? 360 : 0,
                                        scale: theme === item.value ? 1.1 : 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 25,
                                        duration: 0.4,
                                    }}
                                >
                                    {item.icon}
                                </motion.div>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Language */}
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="text-dark-text font-medium">Language</div>

                    <div className="flex rounded-md bg-gray-200 dark:bg-gray-700 p-1 w-64 justify-between">
                        {lang.map((lang) => (
                            <label
                                key={lang.value}
                                className="relative flex-1 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value={lang.value}
                                    checked={i18n.language === lang.value}
                                    onChange={(e) =>
                                        i18n.changeLanguage(e.target.value)
                                    }
                                    className="hidden"
                                />

                                {i18n.language === lang.value && (
                                    <motion.div
                                        layoutId="language-switch"
                                        className="absolute inset-0 rounded-md bg-white dark:bg-gray-900 shadow"
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                        }}
                                    />
                                )}

                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{
                                        scale:
                                            i18n.language === lang.value
                                                ? 1.04
                                                : 1,
                                    }}
                                    className={`relative z-10 px-4 py-2 text-sm font-medium text-center ${
                                        i18n.language === lang.value
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-500 dark:text-gray-300"
                                    }`}
                                >
                                    {lang.label}
                                </motion.div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
