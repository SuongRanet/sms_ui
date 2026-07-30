import React from "react";
import { X, SquarePen } from "lucide-react";
import { useState, useEffect } from "react";
import AlertPopup from "./AlertPopup";
import { Trash2, TriangleAlert, OctagonX, CircleAlert } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import serverRest from "../../services/axios";
import useThemeStore from "../../stores/useThemeStore";
import FormField from "./FormField";

const roles = [
    { id: 1, name: "ADMIN" },
    { id: 2, name: "TEACHER" },
    { id: 3, name: "STUDENT" },
    { id: 4, name: "PARENT" },
];
const EditTeacher = ({
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
    const [dateInput, setDateInput] = useState("");
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
                `/api/v1/teachers/${user.teacherId}`,
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-gray-bg text-dark-text rounded-xl shadow-xl p-2 w-[92vw] max-w-5xl max-h-[88vh] overflow-hidden">
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
                <div className="flex flex-col items-center justify-between px-4 py-3 overflow-y-auto w-full">
                    <div className="flex relative">
                        <div className="flex gap-2 mb-4">
                            <h1 className="font-bold text-4xl">
                                {user?.firstNameEn}
                            </h1>
                            <h1 className="font-bold text-4xl">
                                {user?.lastNameEn}
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
                    <div className="flex justify-center w-full">
                        <div className="w-full max-w-4xl">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    setIsOpenEditAlert(true);
                                }}
                                className="grid grid-cols-2 w-full gap-x-4 gap-y-1"
                            >
                                <FormField
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={currentUser?.email ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                        }))
                                    }
                                    disabled={!isEnable}
                                    required
                                    fullWidth
                                />

                                <label
                                    htmlFor="firstNameKh"
                                    className="text-dark-text/30"
                                >
                                    First Name Kh
                                </label>
                                <label
                                    htmlFor="lastNameKh"
                                    className="text-dark-text/30"
                                >
                                    Last Name Kh
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="firstNameKh"
                                    id="firstNameKh"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.firstNameKh ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            firstNameKh: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="lastNameKh"
                                    id="lastNameKh"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.lastNameKh ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            lastNameKh: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="firstNameEn"
                                    className="text-dark-text/30"
                                >
                                    First Name En
                                </label>
                                <label
                                    htmlFor="lastNameEn"
                                    className="text-dark-text/30"
                                >
                                    Last Name En
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="firstNameEn"
                                    id="firstNameEn"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.firstNameEn ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            firstNameEn: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="lastNameEn"
                                    id="lastNameEn"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.lastNameEn ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            lastNameEn: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="sex"
                                    className="text-dark-text/30"
                                >
                                    Sex
                                </label>
                                <label
                                    htmlFor="phoneNumber"
                                    className="text-dark-text/30"
                                >
                                    Phone Number
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="sex"
                                    id="sex"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.sex ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            sex: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.phoneNumber ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            phoneNumber: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="dob"
                                    className="text-dark-text/30"
                                >
                                    Date of Birth
                                </label>
                                <label
                                    htmlFor="nationalId"
                                    className="text-dark-text/30"
                                >
                                    National ID
                                </label>
                                <input
                                    disabled={!enable}
                                    type="text"
                                    placeholder="DD MM YYYY"
                                    name="dob"
                                    id="dob"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-1 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.dateOfBirth ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            dob: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="nationalId"
                                    id="nationalId"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-1 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.nationalId ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            nationalId: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="departmentId"
                                    className="text-dark-text/30"
                                >
                                    Department ID
                                </label>
                                <label
                                    htmlFor="specialization"
                                    className="text-dark-text/30"
                                >
                                    Specialization
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="number"
                                    name="departmentId"
                                    id="departmentId"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.departmentId ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            departmentId: Number(
                                                e.target.value,
                                            ),
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="specialization"
                                    id="specialization"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.specialization ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            specialization: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="qualification"
                                    className="text-dark-text/30"
                                >
                                    Qualification
                                </label>
                                <label
                                    htmlFor="hiredDate"
                                    className="text-dark-text/30"
                                >
                                    Hired Date
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="qualification"
                                    id="qualification"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.qualification ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            qualification: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled
                                    type="date"
                                    name="hiredDate"
                                    id="hiredDate"
                                    className={`border-none dark:border-none border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.hiredDate ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            hiredDate: e.target.value,
                                        }))
                                    }
                                />

                                <label
                                    htmlFor="employmentStatus"
                                    className="text-dark-text/30"
                                >
                                    Employment Status
                                </label>
                                <label
                                    htmlFor="salary"
                                    className="text-dark-text/30"
                                >
                                    Salary
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="text"
                                    name="employmentStatus"
                                    id="employmentStatus"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.employmentStatus ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            employmentStatus: e.target.value,
                                        }))
                                    }
                                />
                                <input
                                    disabled={!isEnable}
                                    type="number"
                                    name="salary"
                                    id="salary"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}border-2 rounded-md p-1.5 outline-none mb-2 border-gray-300 dark:border-gray-600`}
                                    value={currentUser?.salary ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            salary: e.target.value,
                                        }))
                                    }
                                />

                                {/* <label
                                    htmlFor="profilePhoto"
                                    className="col-span-2 text-dark-text/30"
                                >
                                    Profile Photo
                                </label>
                                <input
                                    disabled={!isEnable}
                                    type="file"
                                    name="profilePhoto"
                                    id="profilePhoto"
                                    className={`${enable ? "border-gray-300 dark:border-gray-600 " : " border-none dark:border-none  "}col-span-2 border-2 rounded-md p-1.5 outline-none mb-2`}
                                    value={currentUser?.profilePhoto ?? ""}
                                    onChange={(e) =>
                                        setCurrentUser((prev) => ({
                                            ...prev,
                                            profilePhoto: e.target.value,
                                        }))
                                    }
                                /> */}
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
                                        className="col-span-1 bg-gold-accent text-white py-1.5 rounded-md hover:bg-gold-accent/50 transition duration-200 w-full"
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

export default EditTeacher;
