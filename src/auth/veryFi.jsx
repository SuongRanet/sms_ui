import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import serverRest from "../services/axios";
import useAuthStore from "../stores/useAuthStore";
import { useState } from "react";
import Swal from "sweetalert2";

const VeryFi = () => {
    const navigate = useNavigate();
    const { theme } = useThemeStore();
    const email = sessionStorage.getItem("verificationEmail");
    // const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const handleSendCode = async (e) => {
        e.preventDefault();

        try {
            const response = await serverRest.post("/api/v1/auth/verify", {
                email,
                verificationCode,
            });

            console.log("Verify response:", response.data);

            if (response.data.success) {
                await Swal.fire({
                    title: "Your account has been verified!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "Continue",

                    background: "var(--color-white1)",
                    color: "var(--color-dark-text)",
                    confirmButtonColor: "var(--color-gold-accent)",
                });

                navigate("/");
                return;
            }
            // Backend returned success: false
            Swal.fire({
                title: "Verification failed",
                text: response.data.message || "Invalid verification code.",
                icon: "error",
                background: "var(--color-white1)",
                color: "var(--color-dark-text)",
                confirmButtonColor: "var(--color-gold-accent)",
            });
        } catch (error) {
            console.error("Verification error:", error);

            Swal.fire({
                title: "Verification failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while verifying your account.",
                icon: "error",
                background: "var(--color-white1)",
                color: "var(--color-dark-text)",
                confirmButtonColor: "var(--color-gold-accent)",
            });
        }
    };
    return (
        <div className="bg-gray-bg min-h-screen flex items-center justify-center px-4">
            <div className="bg-white1 p-6 rounded shadow-md w-full  max-w-sm sm:max-w-md md:max-w-lg">
                <div className="flex justify-center ">
                    <img
                        className="h-16 sm:h-20 md:h-24"
                        src={logo}
                        alt="logo"
                    />
                </div>
                <h1 className=" text-primary-blue text-2xl font-bold text-center sm:text-3xl md:text-4xl ">
                    Verify your account
                </h1>
                <p className="text-gray-500 flex justify-center mb-4">
                    {" "}
                    Enter your SendCode to continue
                </p>
                {/* {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                            {error}
                        </div>
                    )} */}
                <form
                    onSubmit={handleSendCode}
                    className="text-dark-text gap-y-4 flex flex-col"
                >
                    {/* <div className="flex flex-col gap-y-1">
                        <label htmlFor="username">Email or Username</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Example@gmail.com"
                            className="inputLog"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div> */}
                    <div className="flex flex-col gap-y-1">
                        <label htmlFor="username">Send Code </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="123456"
                            className="inputLog"
                            onChange={(e) => {
                                setVerificationCode(e.target.value);
                            }}
                        />
                    </div>
                    {/* <div className="flex flex-col gap-y-1">
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
                        </div> */}
                    <div className="flex flex-col gap-y-1">
                        <button
                            type="submit"
                            className="bg-gold-accent p-2 rounded text-white font-bold hover:bg-amber-400 sm:p-3 text-sm sm:text-base"
                        >
                            Comfirm
                        </button>
                        {/* <p className="text-gray-500 text-center">
                                <a
                                    href="#"
                                    className="text-blue-400 hover:underline"
                                >
                                    Forgot your password?
                                </a>
                            </p> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VeryFi;
