//-Path: "\vite\src\App.jsx"
import AppRoutes from "./routes/AppRoutes";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
};

export default App;
