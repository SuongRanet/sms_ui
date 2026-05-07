//-Path: "\vite\src\main.jsx"
import "./index.css";
import "./i18n/i18n.js";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Providers from "./components/provider/Providers";

createRoot(document.getElementById("root")).render(
    <Providers>
        <App />
    </Providers>,
);
