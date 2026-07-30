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
                <Route path="editTeacher:teacherId"/>
                
            </Route>
        </Routes>
    );
}
