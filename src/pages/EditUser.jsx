import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import serverRest from "../services/axios";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import AlertPopup from "../components/custom/AlertPopup";
import { Trash2, TriangleAlert, OctagonX } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useThemeStore from "../stores/useThemeStore";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [isOpenEditAlert, setIsOpenEditAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState([]);
    const theme = useThemeStore((state) => state.theme);
    const roles = [
        { id: 1, name: "ADMIN" },
        { id: 2, name: "TEACHER" },
        { id: 3, name: "STUDENT" },
        { id: 4, name: "PARENT" },
    ];

    // Fetch existing user data and pre-fill the form
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await serverRest.get(
                    `/api/v1/users/${userId}`,
                );
                const user = response.data.data;
                const id = response.data.data.roles;
                setFirstName(user.firstName || "");
                setLastName(user.lastName || "");
                setUsername(user.username || "");
                setEmail(user.email || "");
                setRoleId(user.roles?.map((role) => role.roleId) || []);
                console.log("Fetched user data:", user);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                setError("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUser();
        } else {
            setError("No user selected to edit.");
            setLoading(false);
        }
    }, [userId]);

    const handleRoleChange = (id) => {
        setRoleId((prev) =>
            prev.includes(id)
                ? prev.filter((roleId) => roleId !== id)
                : [...prev, id],
        );
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const payload = {
                firstName,
                lastName,
                username,
                email,
                roleId, // ✅ matches the DTO
            };
            const response = await serverRest.put(
                `/api/v1/users/${userId}`,
                payload,
            );
            console.log(response.data);
            navigate("/UserList");
            toast.success("User updated successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: useThemeStore.getState().theme,
                transition: Bounce,
            });
        } catch (err) {
            console.error("Update user failed:", err);
            setError("Failed to update user. Please try again.");
        }
    };

    if (loading) {
        return <div className="w-full h-full px-80">Loading user...</div>;
    }

    return (
        <div className="w-full h-full px-80">
            <h1 className="text-xl font-bold"> Update User</h1>
            <p className="text-gray-400 mb-2">Update user information</p>

            {error && (
                <Alert severity="error" className="mb-2">
                    {error}
                </Alert>
            )}

            <div className="flex justify-center">
                <div className="w-150">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setIsOpenEditAlert(true);
                        }}
                        className="grid grid-cols-2 w-full gap-x-4"
                    >
                        <label htmlFor="firstName">First Name </label>
                        <label htmlFor="lastName">Last Name </label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="border-2 border-gray-300 dark:border-gray-600 rounded-md p-1.5 outline-none mb-2"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <label htmlFor="username" className="col-span-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="border-2 border-gray-300 dark:border-gray-600 rounded-md p-1.5 outline-none mb-2 col-span-2"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="email" className="col-span-2">
                            Email{" "}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="col-span-2 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1.5 outline-none mb-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="col-span-2 mb-2 grid grid-cols-2 w-full gap-x-4 relative"></div>
                        <label htmlFor="role" className="col-span-2">
                            Select Role:
                        </label>
                        <div className="col-span-2 flex flex-wrap items-center gap-6 mb-2">
                            {roles.map((role) => (
                                <label
                                    key={role.id}
                                    className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap"
                                >
                                    <input
                                        type="checkbox"
                                        checked={roleId.includes(role.id)}
                                        onChange={() =>
                                            handleRoleChange(role.id)
                                        }
                                        className="w-4 h-4 rounded border-gray-400 text-blue-600 
                                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                                        cursor-pointer accent-blue-600"
                                    />
                                    <span className="text-sm font-medium tracking-wide">
                                        {role.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                        <div className="col-span-2 flex justify-between gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/UserList")}
                                className="col-span-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200 w-full"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="col-span-1 bg-gold-accent text-white py-2 rounded-md hover:bg-gold-accent/50 transition duration-200 w-full"
                            >
                                Update User
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <AlertPopup
                open={isOpenEditAlert}
                onClose={() => setIsOpenEditAlert(false)}
                title="Are you sure?"
                description="You won't be able to revert this!"
                icon={<TriangleAlert className="h-24 w-24 text-yellow-500" />}
                okayButtonText="Yes,update it!"
                cancelButtonText="No, Cancel"
                cancelButtonIcon={<OctagonX />}
                onConfirm={handleUpdateUser}
                btnColor="bg-gold-accent"
                btnColorHover="hover:bg-gold-accent/50"
            />
        </div>
    );
};

export default EditUser;
