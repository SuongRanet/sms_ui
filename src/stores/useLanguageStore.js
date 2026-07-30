import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLanguageStore = create(
    persist(
        (set) => ({
            language: "en",

            setLanguage: (language) => set({ language }),
        }),
        {
            name: "language-storage",
        },
    ),
);

export default useLanguageStore;
