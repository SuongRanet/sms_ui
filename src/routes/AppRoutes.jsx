//-Path: "\vite\src\routes\AppRoutes.jsx"
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import AllCharts from "../pages/AllCharts";
import useAuthStore from "../stores/useAuthStore";
import cookie from "cookiejs";

const ProtectedRoute = ({ children }) => {
    const accessToken = cookie.get("accessToken");
    const { isAuthenticated } = useAuthStore();

    if (!accessToken || !isAuthenticated) return <Navigate to="/" replace />;

    return children;
};

const AuthedRoute = ({ children }) => {
    const accessToken = cookie.get("accessToken");
    const { isAuthenticated } = useAuthStore();

    if (accessToken && isAuthenticated)
        return <Navigate to="/dashboard" replace />;

    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            {/* Public */}
            <Route
                path="/"
                element={
                    <AuthedRoute>
                        <Login />
                    </AuthedRoute>
                }
            />

            {/* Protected */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/*children go here */}
                <Route index element={<AllCharts />} />
            </Route>
        </Routes>
    );
}
