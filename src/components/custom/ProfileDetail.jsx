import React from "react";
import { X, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import AlertPopup from "./AlertPopup";
import { Trash2, TriangleAlert, OctagonX, CircleAlert } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import serverRest from "../../services/axios";
import useThemeStore from "../../stores/useThemeStore";

const roles = [
    { id: 1, name: "ADMIN" },
    { id: 2, name: "TEACHER" },
    { id: 3, name: "STUDENT" },
    { id: 4, name: "PARENT" },
];
const ProfileDetail = ({
    open,
    onClose,
    title,
    user,
    fetchUser,
    isEnable,
    setEnable,
}) => {
    const [isOpenEditAlert, setIsOpenEditAlert] = useState(false);
    const [enable, setEnableLocal] = useState(Boolean(isEnable));
    const [sure, setSure] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const theme = useThemeStore((state) => state.theme);
    const handleRoleChange = (id) => {
        setCurrentUser(
            (prev) =>
                prev?.roles && {
                    ...prev,
                    roles: prev.roles?.includes(id)
                        ? prev.roles.filter((roleId) => roleId !== id)
                        : [...prev.roles, id],
                },
        );
        console.log(currentUser);
        // setCurrentUser((prev) => {
        //     console.log(prev?.roles);
        //     return prev;
        // });
    };
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        setError("");
        try {
            // const payload = {
            //     firstName : currentUser,firstName,
            //     lastName :
            //     username,
            //     email,
            //     roleId,
            // };
            const response = await serverRest.put(
                `/api/v1/users/${user.userId}`,
                currentUser,
            );
            console.log(response.data);
            onClose();
            setEnable(false);
            fetchUser();
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
    const checkMatchUser = () => {
        const userRoleID = userEqul(user);
        const userJSON = JSON.stringify(userRoleID);
        const currentUserJSON = JSON.stringify(currentUser);
        // console.log(userRoleID)
        // console.log(userJSON)
        // console.log(currentUserJSON)
        return userJSON === currentUserJSON;
    };
    const userEqul = (user) => {
        const newUser = { ...user };
        newUser.roles = newUser.roles?.map((role) => role.roleId) || [];
        return newUser;
    };
    const handleClose = () => {
        if (!checkMatchUser()) return;
        onClose();
        setEnable(false);
    };
    useEffect(() => {
        setCurrentUser(userEqul(user));
    }, [user]);

    useEffect(() => {
        setEnableLocal(Boolean(isEnable));
    }, [isEnable]);

    return open ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div
                className="absolute bg-black/50 top-0 left-0 w-full h-full"
                onClick={handleClose}
            />
            <div className="absolute top-50% left-50% transform-(-50%,-50%) flex flex-col bg-gray-bg text-dark-text  rounded-xl shadow-xl  ​ p-2">
                <div className="flex items-start justify-between px-4 py-2 bg-white1 text-dark-text rounded-t-xl">
                    <h1 className="text-dark-text">{title}</h1>
                    <button
                        className="text-dark-text font-bold text-xl "
                        onClick={() => {
                            if (checkMatchUser()) {
                                onClose();
                                setEnable(false);
                            } else {
                                setSure(true);
                            }
                        }}
                    >
                        <X />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-between px-5 py-4">
                    <div className="flex relative">
                        <div className="flex gap-2 mb-4">
                            <h1 className="font-bold text-4xl">
                                {user?.firstName}
                            </h1>
                            <h1 className="font-bold text-4xl">
                                {user?.lastName}
                            </h1>
                        </div>
                        <button
                            className={`${isEnable ? "text-red-500" : ""} absolute -right-10.5 top-px text-gold-accent hover:text-gold-accent/50 hover:bg-gold-accent/20 p-2 rounded-full`}
                            onClick={() => {
                                const nextValue = !isEnable;
                                setEnableLocal(nextValue);
                                setEnable(nextValue);
                            }}
                        >
                            <SquarePen />
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-150">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsOpenEditAlert(true);
                                }}
                                className="grid grid-cols-2 w-full gap-x-4"
                            >
                                <label
                                    htmlFor="firstName"
                                    className="text-dark-text/30"
                                >
                                    First Name{" "}
                                </label>
                                <label
                                    htmlFor="lastName"
                                    className="text-dark-text/30"
                                >
                                    Last Name{" "}
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.firstName}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => {
                                            return {
                                                ...prev,
                                                firstName: e.target.value,
                                            };
                                        })
                                    }
                                    required
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 border-gray-300 dark:border-gray-600 rounded-md p-1.5 outline-none mb-2`}
                                    value={currentUser?.lastName}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => {
                                            return {
                                                ...prev,
                                                lastName: e.target.value,
                                            };
                                        })
                                    }
                                    required
                                />
                                <label
                                    htmlFor="username"
                                    className="col-span-2 text-dark-text/30"
                                >
                                    Username
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="username"
                                    id="username"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 border-gray-300 dark:border-gray-600 rounded-md p-1.5 outline-none mb-2 col-span-2`}
                                    value={currentUser?.username}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => {
                                            return {
                                                ...prev,
                                                username: e.target.value,
                                            };
                                        })
                                    }
                                    required
                                />
                                <label
                                    htmlFor="email"
                                    className="col-span-2 text-dark-text/30"
                                >
                                    Email{" "}
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}col-span-2 border-2 rounded-md p-1.5 outline-none mb-2`}
                                    value={currentUser?.email}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => {
                                            return {
                                                ...prev,
                                                email: e.target.value,
                                            };
                                        })
                                    }
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
                                                disabled={!isEnable}
                                                type="checkbox"
                                                checked={currentUser?.roles?.includes(
                                                    role.id,
                                                )}
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
                                    {/* <button
                                        type="button"
                                        onClose={onClose}
                                        className="col-span-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200 w-full"
                                    >
                                        Back
                                    </button> */}
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
            <AlertPopup
                open={sure}
                onClose={() => setSure(false)}
                title="Are you sure?"
                description="You won't be able to revert this!"
                icon={<CircleAlert className="h-24 w-24 text-yellow-500" />}
                okayButtonText="Yes, Close it!"
                cancelButtonText="No, Cancel"
                cancelButtonIcon={<OctagonX />}
                onConfirm={() => {
                    setSure(false);
                    onClose();
                }}
                btnColor="bg-gold-accent"
                btnColorHover="hover:bg-gold-accent/50"
            />
        </div>
    ) : null;
};

export default ProfileDetail;
