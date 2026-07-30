import React, { useState, useEffect } from "react";
import serverRest from "../services/axios";
import Cookies from "js-cookie";
import SearchInput from "../components/custom/SearchInput";
import { useNavigate } from "react-router-dom";
import AlertPopup from "../components/custom/AlertPopup";
import { Trash2, TriangleAlert, OctagonX } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import useThemeStore from "../stores/useThemeStore";
import { useTranslation } from "react-i18next";

// Avatar backgrounds built from your theme tokens (rotates for variety)
const ROLE_AVATAR_STYLES = {
    ADMIN: "bg-gold-accent",
    TEACHER: "bg-primary-blue",
    STUDENT: "bg-emerald-500",
    PARENT: "bg-violet-500",
};
const AVATAR_STYLES = [
    "bg-primary-blue",
    "bg-gold-accent",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-cyan-500",
    "bg-orange-500",
];

const ROLE_STYLES = {
    ADMIN: "bg-amber-100 text-amber-800 border border-amber-300",
    TEACHER: "bg-blue-100 text-blue-800 border border-blue-300",
    STUDENT: "bg-green-100 text-green-800 border border-green-300",
    PARENT: "bg-purple-100 text-purple-800 border border-purple-300",
};

function getInitials(firstName, lastName) {
    const f = firstName?.[0] ?? "";
    const l = lastName?.[0] ?? "";
    return (f + l).toUpperCase() || "??";
}

function getAvatarStyle(seed = "", roles = []) {
    const roleName = roles?.[0]?.roleName;

    if (ROLE_AVATAR_STYLES[roleName]) {
        return ROLE_AVATAR_STYLES[roleName];
    }

    let hash = 0;

    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    return AVATAR_STYLES[Math.abs(hash) % AVATAR_STYLES.length];
}

const Studentlist = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([]);
    const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [selectedUser, setSelectedUser] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [keyword, setKeyword] = useState("");
    function formatDate(iso) {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    }
    const [search, setSearch] = useState("");
    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            `${u.firstNameEn} ${u.lastNameEn}`.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.username?.toLowerCase().includes(q)
        );
    });
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await serverRest.post(`/api/v1/students/search`, {
                keyword: keyword,
                province: "",
                gender: "",
                fullNameKh: "",
                gradeLevel: "",
                classId: "",
                enrolledFrom: "",
                enrolledTo: "",

                page: page, // ✅ ใช้ state page ปัจจุบัน แทน hardcode 0
                size: size, // ✅ ใช้ state size ปัจจุบัน แทน hardcode 10

                sortBy: "id",
                direction: "asc",
            });
            const data = response;
            setUsers(data.data.data || []);
            setTotalElements(data.data.total || 0);
            setTotalPages(
                Math.ceil((data.data.total || 0) / (data.data.size || size)),
            );
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setPage(0);
    }, [keyword]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchUsers();
        }, 400);
        return () => clearTimeout(timeout);
    }, [page, keyword]);

    const handleEdit = (user) => {
        // TODO: implement edit flow
        console.log("Edit user:", user);
        navigate(`/editUser/${user.userId}`);
    };
    const handleDelete = async (user) => {
        try {
            const response = await serverRest.delete(
                `/api/v1/teachers/${user.teacherId}`,
            );
            // console.log("Delete Success:", response.data);
            setUsers((prev) =>
                prev.filter((u) => u.teacherId !== user.teacherId),
            );
            toast.success("User deleted successfully!", {
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
        } catch (error) {
            console.error("Delete Error:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
            console.log("Cookie Token:", Cookies.get("accessToken"));
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "useThemeStore.getState().theme",
                transition: Bounce,
            });
        }
    };
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
    const rangeStart = totalElements === 0 ? 0 : page * size + 1;
    const rangeEnd = Math.min((page + 1) * size, totalElements);

    return (
        <div className="bg-white1 text-dark-text rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <SearchInput value={keyword} onChange={setKeyword} />
                </div>
                <div className="">
                    <button
                        onClick={() => navigate("/CreateUser")}
                        className="text-sm font-medium w-full h-full bg-indigo-500 text-white1 px-6 py-1.5 rounded-lg hover:bg-primary-blue/80 cursor-pointer"
                    >
                        {t("table.addUser")}
                    </button>
                </div>
            </div>
            <div className="max-h-125 overflow-auto rounded-lg border border-gray-bg">
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: 13.5,
                    }}
                >
                    <thead className="sticky top-0 z-10 bg-gray-bg">
                        <tr>
                            <th className="text-left px-2 py-3 opacity-50 font-medium">
                                ID
                            </th>
                            <th className="text-left px-2 py-3">
                                {/* {t("table.user")} */}
                                Full Name
                            </th>
                            <th className="text-left px-2 py-3">
                                {/* {t("table.email")} */}
                                Phone Number
                            </th>
                            {/* <th className="text-left px-2 py-3">
                                {t("table.role")}
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.status")}
                            </th> */}
                            <th className="text-left px-2 py-3">
                                {/* {t("table.createAt")} */}
                                Register
                            </th>
                            <th className="text-left px-2 py-3 w-36">
                                {t("table.action")}
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading && error && (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="text-center py-4 text-red-500"
                                >
                                    {error}
                                </td>
                            </tr>
                        )}

                        {!loading && !error && users.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-4">
                                    No users found.
                                </td>
                            </tr>
                        )}

                        {!loading &&
                            !error &&
                            users.map((user, index) => {
                                const fullName =
                                    `${user.studentfirstNameEn ?? ""} ${user.studentlastNameEn ?? ""}`.trim() ||
                                    "Unknown";
                                const initials = getInitials(
                                    user.studentfirstNameEn,
                                    user.studentlastNameEn,
                                );
                                const avatarStyle = getAvatarStyle(
                                    user.studentId?.toString() ?? fullName,
                                );

                                return (
                                    <tr
                                        key={user.studentId}
                                        className="bg-white1 border-t border-gray-bg hover:bg-light-blue/40"
                                    >
                                        <td className="px-2 opacity-50">
                                            {user.studentId}
                                        </td>

                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white1 text-xs font-semibold ${avatarStyle}`}
                                                >
                                                    {initials}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-dark-text">
                                                        {fullName}
                                                    </div>
                                                    <div className="opacity-50 text-xs">
                                                        {user.fullNameEn}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-2 opacity-80">
                                            {user.phoneNumber}
                                        </td>

                                        {/* <td className="px-2">
                                            <div className="flex flex-col gap-1 items-start">
                                                {(user.roles ?? []).map(
                                                    (role) => (
                                                        <span
                                                            key={role.roleName}
                                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                                                ROLE_STYLES[
                                                                    role
                                                                        .roleName
                                                                ] ??
                                                                "bg-gray-bg opacity-70"
                                                            }`}
                                                        >
                                                            {role.roleName}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </td> */}

                                        {/* <td className="px-2">
                                            <div className="flex flex-col gap-1 text-xs">
                                                <span
                                                    className={
                                                        user.verified
                                                            ? "text-primary-blue font-medium"
                                                            : "opacity-40"
                                                    }
                                                >
                                                    {user.verified
                                                        ? "✔ Verified"
                                                        : "— Unverified"}
                                                </span>
                                            </div>
                                        </td> */}

                                        <td className="px-2 opacity-80">
                                            {user.hiredDate}
                                        </td>

                                        <td className="px-2 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(user)
                                                    }
                                                    className="bg-primary-blue text-white1 px-2 py-1 rounded"
                                                >
                                                    {t("table.edit")}
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setIsOpenDeleteAlert(
                                                            true,
                                                        );
                                                    }}
                                                    className="bg-gold-accent text-white1 px-2 py-1 rounded"
                                                >
                                                    {t("table.delete")}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="opacity-60 text-sm">
                    {t("table.showing")}{" "}
                    <span className="font-medium">
                        {rangeStart}–{rangeEnd}
                    </span>{" "}
                    {t("table.of")}{" "}
                    <span className="font-medium">{totalElements}</span>{" "}
                    {t("table.user")}
                </div>

                <div className="flex items-center gap-1">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((prev) => prev - 1)}
                        className="px-3 py-1 rounded opacity-60 disabled:opacity-30"
                    >
                        {t("table.prev")}
                    </button>

                    {pageNumbers.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={`w-8 h-8 rounded ${
                                p === page
                                    ? "bg-primary-blue text-white1 font-semibold"
                                    : "hover:bg-gray-bg opacity-70"
                            }`}
                        >
                            {p + 1}
                        </button>
                    ))}

                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((prev) => prev + 1)}
                        className="px-3 py-1 rounded disabled:opacity-30"
                    >
                        {t("table.next")}
                    </button>
                </div>
            </div>
            <AlertPopup
                open={isOpenDeleteAlert}
                onClose={() => setIsOpenDeleteAlert(false)}
                title="Are you sure?"
                description="You won't be able to revert this!"
                icon={<Trash2 className="h-24 w-24 text-red-500" />}
                okayButtonText="Yes, Delete it!"
                cancelButtonText="No, Cancel"
                cancelButtonIcon={<OctagonX />}
                onConfirm={() => handleDelete(selectedUser)}
                btnColor="bg-gold-accent"
                btnColorHover="hover:bg-gold-accent/50"
            />
        </div>
    );
};

export default Studentlist;
