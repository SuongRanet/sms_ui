import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import serverRest from "../services/axios";
import useAuthStore from "../stores/useAuthStore";
import cookie from "cookiejs";

export const Login = () => {
    const navigate = useNavigate();
    const { user, login } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await serverRest.post("/api/v1/auth/login", {
                username,
                password,
            });

            console.log("Login response:", response.data);
            const accessToken = response.data.data.accessToken;
            const refreshToken = response.data.data.refreshToken;

            cookie("accessToken", accessToken, { expires: 3 }); // Store token in cookie for 3 days
            console.log("Login success:", response.data);

            login(response.data.data.user);

            // const roles = response.data.data.user.roles.map((r) => r.roleName);
            // localStorage.setItem("roles", JSON.stringify(roles));
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
            if (error.response?.status === 401) {
                setError("Invalid username or password");
            } else if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    return (
        <div className="bg-gray-bg min-h-screen flex items-center justify-center px-4">
            <div
                className="bg-white1 p-6 rounded shadow-md w-full  
                max-w-sm 
                sm:max-w-md 
                md:max-w-lg"
            >
                <div className="flex justify-center ">
                    <img
                        className="h-16 sm:h-20 md:h-24"
                        src={logo}
                        alt="logo"
                    />
                </div>
                <h1
                    className="text-primary-blue text-2xl font-bold text-center
        sm:text-3xl 
        md:text-4xl "
                >
                    Login
                </h1>
                <p className="text-gray-500 flex justify-center mb-4">
                    {" "}
                    Enter your email to continue
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleLogin}
                    className="text-dark-text gap-y-4 flex flex-col"
                >
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="username">Email or Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Example@gmail.com"
                            className="inputLog"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setError("");
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full pr-10 inputLog"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <button
                            type="submit"
                            className="bg-gold-accent p-2 rounded text-white font-bold hover:bg-amber-400 sm:p-3 text-sm sm:text-base"
                        >
                            Login
                        </button>
                        <p className="text-gray-500 text-center">
                            <a
                                href="#"
                                className="text-blue-400 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
