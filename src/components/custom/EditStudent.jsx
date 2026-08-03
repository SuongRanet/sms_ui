import React from "react";
import { X, SquarePen } from "lucide-react";
import { FormInput } from "./FormInput";
import { useState } from "react";
import FormField from "./FormField";
import { useEffect } from "react";
import serverRest from "../../services/axios";
import AlertPopup from "./AlertPopup";
import { OctagonX, CircleAlert } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useThemeStore from "../../stores/useThemeStore";
import FormFieldStudent from "./FormFieldStudent";

const EditStudent = ({
    title,
    user,
    open,
    onClose,
    isEnable,
    setEnable,
    fetchUser,
}) => {
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [error, setError] = useState(false);
    const [openLocal, setOpenlocal] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [sure, setSure] = useState(false);
    const [student, setStudent] = useState(undefined);

    const fetchStudent = async () => {
        setLoading(true);
        setError(null);
        console.log(user?.studentId);
        if (!user) return;
        try {
            const response = await serverRest.get(
                `/api/v1/students/${user?.studentId}`,
            );
            const data = response.data;
            console.log(data);
            setStudent(data);
            setCurrentUser(data);
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };
    const handleClose = () => {
        if (checkMatchUser()) {
            setOpenEdit(false);
            onClose();
        } else return setSure(true);
    };
    const checkMatchUser = () => {
        const userJSON = JSON.stringify(student);
        const currentUserJSON = JSON.stringify(currentUser);
        // console.log(userJSON);
        // console.log(currentUserJSON);
        return userJSON === currentUserJSON;
        // console.log(userRoleID)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;
        try {
            const response = await serverRest.put(
                `/api/v1/students/${user?.studentId}`,
                student,
            );
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
            onClose();
            setOpenEdit(false);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchStudent();
    }, [user]);

    return open ? (
        <div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div
                    className="absolute bg-black/50 top-0 left-0 w-full h-full"
                    onClick={handleClose}
                />
                <div className="absolute top-50% left-50% transform-(-50%,-50%) flex flex-col bg-gray-bg text-dark-text  rounded-xl shadow-xl h-120  w-160  ​ p-2 overflow-hidden">
                    <div className="flex items-start justify-between px-4 py-2 bg-white1 text-dark-text rounded-t-xl">
                        {/* Header */}
                        <h1 className="text-dark-text">{title}</h1>
                        <button
                            className="text-dark-text font-bold text-xl"
                            onClick={handleClose}
                        >
                            <X />
                        </button>
                    </div>
                    {/* Body */}
                    <div className="overflow-y-auto">
                        <div className="flex relative">
                            <div className="flex gap-2 mb-4 p-4">
                                <h1 className="font-bold text-4xl">
                                    {currentUser?.firstNameEn}
                                </h1>
                                <h1 className="font-bold text-4xl">
                                    {currentUser?.lastNameEn}
                                </h1>
                            </div>
                            <button
                                className={`${openEdit ? "text-red-500" : ""} absolute right-2 top-2 text-gold-accent hover:text-gold-accent/50 hover:bg-gold-accent/20 p-2 rounded-full`}
                                onClick={() => {
                                    setOpenEdit((prev) => !prev);
                                }}
                            >
                                <SquarePen />
                            </button>
                        </div>
                        <form
                            action=""
                            onSubmit={handleSubmit}
                            className="px-4"
                        >
                            <FormFieldStudent
                                setValueStudent={setStudent}
                                valueStudent={student}
                                isEnable={openEdit}
                            />
                            <button
                                type="submit"
                                className="col-span-1 mb-2 bg-gold-accent text-white py-2 rounded-md hover:bg-gold-accent/50 transition duration-200 w-full"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
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

export default EditStudent;
