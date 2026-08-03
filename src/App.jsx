//-Path: "\vite\src\App.jsx"
import AppRoutes from "./routes/AppRoutes";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import useThemeStore from "./stores/useThemeStore";
import { useTranslation } from "react-i18next";
const App = () => {
    const theme = useThemeStore((state) => state.theme);
    const { i18n } = useTranslation();
    return (
        <Router>
            <div
                className={
                    i18n.language === "kh" ? "font-khmer" :i18n.language === "jp" ? "font-japan" : "font-english"
                }
            >
                <AppRoutes />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="{useThemeStore.getState().theme}"
                    transition={Bounce}
                />
            </div>
        </Router>
    );
};

export default App;
