//-Path: "\vite\src\routes\AppRoutes.jsx"
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../auth/Login";
import Dashboard from "../pages/Dashboard";
import AllCharts from "../pages/AllCharts";
import UserList from "../pages/UserList";
import useAuthStore from "../stores/useAuthStore";
import Cookies from "js-cookie";
import CreateUser from "../pages/CreateUser";
import EditUser from "../pages/EditUser";
import TeacherList from "../pages/TeacherList";
import Studentlist from "../pages/StudentList";
import ClassList from "../pages/ClassList";
import ForgotPW from "../auth/ForgotPW";
import ConfirmCode from "../auth/ConfirmCode.jsx";
import ResetPW from "../auth/ResetPW.jsx";

const ProtectedRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken");
    const { isAuthenticated } = useAuthStore();

    if (!accessToken || !isAuthenticated) return <Navigate to="/" replace />;

    return children;
};

const AuthedRoute = ({ children }) => {
    const accessToken = Cookies.get("accessToken");
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
            <Route
                path="/forgotPassword"
                element={
                    <AuthedRoute>
                        <ForgotPW />
                    </AuthedRoute>
                }
            />
            <Route
                path="/confirmCode"
                element={
                    <AuthedRoute>
                        <ConfirmCode />
                    </AuthedRoute>
                }
            />
            <Route
                path="/resetPassword"
                element={
                    <AuthedRoute>
                        <ResetPW />
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
            <Route
                path="/userList"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                <Route index element={<UserList />} />

                <Route path="createUser" element={<CreateUser />} />

                <Route path="editUser/:userId" element={<EditUser />} />
            </Route>
            <Route
                path="/teacherList"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/*children go here */}
                <Route index element={<TeacherList />} />
                <Route path="createUser" element={<CreateUser />} />
            </Route>
            <Route
                path="/studentList"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/*children go here */}
                <Route index element={<Studentlist />} />
                <Route path="createUser" element={<CreateUser />} />
            </Route>
            <Route
                path="/classList"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/*children go here */}
                <Route index element={<ClassList/>} />
            </Route>
        </Routes>
    );
}
