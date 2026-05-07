import { create } from "zustand";
import { persist } from "zustand/middleware";

const getInitialTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const useThemeStore = create()(
    persist(
        (set) => ({
            theme: getInitialTheme(),
            setTheme: (theme) => set({ theme }),
        }),
        { name: "theme" },
    ),
);
export default useThemeStore;
