import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import serverRest from "../services/axios";
import { useNavigate } from "react-router-dom";
import useThemeStore from "../stores/useThemeStore";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";

const ResetPW = () => {
    const { theme } = useThemeStore();

    const [searchParams] = useSearchParams();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.getItem("resetToken");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire({
                title: "Invalid reset link",
                text: "Password reset token is missing.",
                icon: "error",
            });
            return;
        }

        if (!password || !confirmPassword) {
            Swal.fire({
                title: "Missing password",
                text: "Please enter your password.",
                icon: "warning",
                background: "var(--color-white1)",
                color: "var(--color-dark-text)",
                confirmButtonColor: "var(--color-gold-accent)",
            });
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (!/[0-9]/.test(password)) {
            setError("Password must contain at least one number.");
            return;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            setError("Password must contain at least one special character.");
            return;
        }

        setError("");
        if (password !== confirmPassword) {
            Swal.fire({
                title: "Passwords do not match",
                text: "Please make sure both passwords are the same.",
                icon: "error",
                background: "var(--color-white1)",
                    color: "var(--color-dark-text)",
                    confirmButtonColor: "var(--color-gold-accent)",
            });
            return;
        }

        try {
            const response = await serverRest.post(
                "/api/v1/auth/reset-password",
                {
                    token: token,
                    newPassword: password,
                },
            );

            console.log("Reset password response:", response.data.message);

            if (
                response.data.message ===
                "Password has been reset successfully."
            ) {
                await Swal.fire({
                    title: "Password reset successfully!",
                    text: "You can now login with your new password.",
                    icon: "success",
                    confirmButtonText: "Login",
                    background: "var(--color-white1)",
                    color: "var(--color-dark-text)",
                    confirmButtonColor: "var(--color-gold-accent)",
                });

                navigate("/");
            } else {
                Swal.fire({
                    title: "Reset failed",
                    text: response.data.message || "Unable to reset password.",
                    icon: "error",
                    background: "var(--color-white1)",
                    color: "var(--color-dark-text)",
                    confirmButtonColor: "var(--color-gold-accent)",
                });
            }
        } catch (error) {
            console.error("Reset password error:", error);

            Swal.fire({
                title: "Reset failed 2",
                text:
                    error.response?.data?.message ||
                    "The reset link may be invalid or expired.",
                icon: "error",
                background: "var(--color-white1)",
                color: "var(--color-dark-text)",
                confirmButtonColor: "var(--color-gold-accent)",
            });
        }
    };

    return (
        <div className="bg-gray-bg min-h-screen flex items-center justify-center px-4">
            <div className="bg-white1 p-6 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg">
                <div className="flex justify-center">
                    <img
                        className="h-16 sm:h-20 md:h-24"
                        src={logo}
                        alt="logo"
                    />
                </div>

                <h1 className="text-primary-blue text-2xl font-bold text-center sm:text-3xl md:text-4xl">
                    Reset your Password
                </h1>

                <p className="text-gray-500 flex justify-center mb-4">
                    Enter your new password
                </p>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                        {error}
                    </div>
                )}
                <form
                    onSubmit={handleResetPassword}
                    className="text-dark-text gap-y-4 flex flex-col"
                >
                    {/* Password */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="password">Password</label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Enter your password"
                                className="w-full pr-10 inputLog"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                placeholder="Confirm your password"
                                className="w-full pr-10 inputLog"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-gold-accent p-2 rounded text-white font-bold hover:bg-amber-400 sm:p-3 text-sm sm:text-base"
                    >
                        Confirm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPW;
