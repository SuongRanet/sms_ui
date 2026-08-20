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
import ProfileDetail from "../components/custom/ProfileDetail";
import { motion } from "motion/react";

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
const roles = [
    { label: "All", value: "ALL" },
    { label: "Students", value: "STUDENT" },
    { label: "Teachers", value: "TEACHER" },
    { label: "Parents", value: "PARENT" },
    { label: "Admins", value: "ADMIN" },
];
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

const UserList = () => {
    const [selectedRole, setSelectedRole] = useState("ALL");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([]);
    const [openDetail, setOpenDetail] = useState(null);
    const [isOpenDeleteAlert, setIsOpenDeleteAlert] = useState(false);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [enable, setEnable] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // const [totalPages, setTotalPages] = useState(0);
    // const [totalElements, setTotalElements] = useState(0);
    const navigate = useNavigate();
    const { t } = useTranslation();
    function formatDate(iso) {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    }
    const theme = useThemeStore((state) => state.theme);
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter((u) => {
        const q = search.toLowerCase();
        return (
            `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
            u.email?.toLowerCase().includes(q) ||
            u.username?.toLowerCase().includes(q)
        );
    });
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await serverRest.get(
                `/api/v1/users/?page=0&size=1000`,
            );
            const data = response.data.data;
            setUsers(data.content || []);
        } catch (error) {
            console.error(error);
            setError("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); // fetch once

    // filter by role + search over the FULL set
    const filteredUsersRoles = users.filter((user) => {
        const matchesRole =
            selectedRole === "ALL" ||
            user.roles?.some((role) => role.roleName === selectedRole);

        const q = search.toLowerCase();
        const matchesSearch =
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(q) ||
            user.email?.toLowerCase().includes(q) ||
            user.username?.toLowerCase().includes(q);

        return matchesRole && matchesSearch;
    });

    // recalc pagination from the FILTERED set
    const totalElements = filteredUsersRoles.length;
    const totalPages = Math.ceil(totalElements / size) || 0;

    // reset page whenever the filter/search narrows the results
    useEffect(() => {
        setPage(0);
    }, [selectedRole, search]);

    // clamp in case current page no longer exists after filtering
    useEffect(() => {
        if (page > 0 && page >= totalPages) {
            setPage(Math.max(totalPages - 1, 0));
        }
    }, [totalPages]);

    // slice the current page out of the filtered set for rendering
    const pagedUsers = filteredUsersRoles.slice(
        page * size,
        page * size + size,
    );

    const handleEdit = (user) => {
        // TODO: implement edit flow
        console.log("Edit user:", user);
        // navigate(`/userList/editUser/${user.userId}`);
    };
    const handleDelete = async (user) => {
        try {
            const response = await serverRest.delete(
                `/api/v1/users/${user.userId}`,
            );
            // console.log("Delete Success:", response.data);
            setUsers((prev) => prev.filter((u) => u.userId !== user.userId));
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

    const toggleSelect = (userId) => {
        setSelected((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId],
        );
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

    const rangeStart = totalElements === 0 ? 0 : page * size + 1;
    const rangeEnd = Math.min((page + 1) * size, totalElements);

    return (
        <div className="bg-white1 text-dark-text rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <SearchInput onChange={setSearch} />

                    <div className="flex rounded-lg bg-gray-bg w-fit p-0.5">
                        {roles.map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setSelectedRole(item.value)}
                                className="relative flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
                            >
                                {selectedRole === item.value && (
                                    <motion.div
                                        layoutId="role-filter"
                                        className="absolute inset-0 rounded-md bg-white1 shadow"
                                        transition={{
                                            type: "spring",
                                            stiffness: 450,
                                            damping: 35,
                                        }}
                                    />
                                )}

                                <motion.span
                                    className={`relative z-10 ${
                                        selectedRole === item.value
                                    }`}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                </motion.span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="">
                    <button
                        onClick={() => navigate("/userList/CreateUser")}
                        className="text-sm font-bold w-full h-full bg-indigo-500 text-white1 px-6 py-1.5 rounded-lg hover:bg-primary-blue/80 cursor-pointer"
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
                                #
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.user")}
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.email")}
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.role")}
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.status")}
                            </th>
                            <th className="text-left px-2 py-3">
                                {t("table.createAt")}
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
                            pagedUsers.map((user, index) => {
                                const fullName =
                                    `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() ||
                                    "Unknown";
                                const initials = getInitials(
                                    user.firstName,
                                    user.lastName,
                                );
                                const avatarStyle = getAvatarStyle(
                                    user.userId?.toString() ?? fullName,
                                    user.role,
                                );

                                return (
                                    <tr
                                        key={user.userId}
                                        className="bg-white1 border-t border-gray-bg hover:bg-light-blue/40"
                                        onClick={() =>
                                            setOpenDetail(user.userId)
                                        }
                                    >
                                        <td className="px-2 opacity-50">
                                            {page * size + index + 1}
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
                                                        {user.username}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-2 opacity-80">
                                            {user.email}
                                        </td>

                                        <td className="px-2">
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
                                        </td>

                                        <td className="px-2">
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
                                        </td>

                                        <td className="px-2 opacity-80">
                                            {formatDate(user.createdAt)}
                                        </td>

                                        <td className="px-2 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        // setOpenDetail(user.userId)
                                                        setEnable(true)
                                                    }
                                                    className="bg-primary-blue text-white1 px-2 py-1 rounded"
                                                >
                                                    {t("table.edit")}
                                                </button>

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedUser(user);
                                                        setIsOpenDeleteAlert(
                                                            true,
                                                        );
                                                    }}
                                                    className="bg-gold-accent text-white1 px-2 py-1  rounded"
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

            <ProfileDetail
                title={"Profile Detail"}
                user={users.find((user) => user.userId === openDetail)}
                open={openDetail !== null}
                onClose={() => setOpenDetail(null)}
                fetchUser={fetchUsers}
                isEnable={enable}
                setEnable={setEnable}
            />
        </div>
    );
};

export default UserList;
