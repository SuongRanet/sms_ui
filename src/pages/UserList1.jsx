import { useState, useMemo, useEffect } from "react";
import serverRest from "../services/axios";

const fetchUsers = async () => {
    try {
        const { data: res } = await serverRest.get("/api/v1/users/");

        setUsers(res.data.content);
        setMeta(res.data);
    } catch (error) {
        console.error(error);
    }
};
const ROLE_STYLES = {
    ADMIN: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
    TEACHER: { bg: "#ede9fe", text: "#5b21b6", dot: "#8b5cf6" },
    STUDENT: { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" },
};

function getInitials(firstName, lastName) {
    return `${(firstName?.[0] || "").toUpperCase()}${(lastName?.[0] || "").toUpperCase()}`;
}

function getAvatarColor(userId) {
    const colors = [
        "#6366f1",
        "#8b5cf6",
        "#ec4899",
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#ef4444",
        "#14b8a6",
    ];
    return colors[userId % colors.length];
}

function formatDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

function RoleBadge({ roleName }) {
    const s = ROLE_STYLES[roleName] || {
        bg: "#f3f4f6",
        text: "#374151",
        dot: "#9ca3af",
    };
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: s.bg,
                color: s.text,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                padding: "3px 9px",
                borderRadius: 20,
            }}
        >
            <span
                style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: s.dot,
                    display: "inline-block",
                }}
            />
            {roleName}
        </span>
    );
}

function StatusDot({ active, label }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                color: active ? "#059669" : "#9ca3af",
                fontWeight: 500,
            }}
        >
            <span
                style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: active ? "#10b981" : "#d1d5db",
                    display: "inline-block",
                }}
            />
            {label}
        </span>
    );
}

function VerifiedIcon({ verified }) {
    if (verified) {
        return (
            <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                title="Verified"
            >
                <circle cx="10" cy="10" r="10" fill="#3b82f6" />
                <path
                    d="M6 10.5l2.5 2.5 5.5-5.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    return (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#e5e7eb" />
            <path
                d="M7 10h6"
                stroke="#9ca3af"
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({});
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [selectedIds, setSelectedIds] = useState([]);
    const [sortKey, setSortKey] = useState("userId");
    const [sortDir, setSortDir] = useState("asc");
    const [page, setPage] = useState(0);
    const [pageSize] = useState(6);
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        try {
            await serverRest.delete(`/api/v1/users/${id}`);

            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data: res } = await serverRest.get("/api/v1/users/");

            setUsers(res.data.content);
            setMeta(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const roles = ["ALL", "ADMIN", "TEACHER", "STUDENT", "PARENT"];

    const filtered = useMemo(() => {
        let list = [...users];
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (u) =>
                    u.username.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    `${u.firstName} ${u.lastName}`.toLowerCase().includes(q),
            );
        }
        if (roleFilter !== "ALL") {
            list = list.filter((u) =>
                u.roles.some((r) => r.roleName === roleFilter),
            );
        }
        list.sort((a, b) => {
            let av = a[sortKey],
                bv = b[sortKey];
            if (typeof av === "string") av = av.toLowerCase();
            if (typeof bv === "string") bv = bv.toLowerCase();
            if (av < bv) return sortDir === "asc" ? -1 : 1;
            if (av > bv) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
        return list;
    }, [users, search, roleFilter, sortKey, sortDir]);

    const totalPages = Math.ceil(filtered.length / pageSize);
    const paginated = filtered.slice(
        page * pageSize,
        page * pageSize + pageSize,
    );

    function toggleSort(key) {
        if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        else {
            setSortKey(key);
            setSortDir("asc");
        }
        setPage(0);
    }

    function toggleSelect(id) {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
        );
    }

    function toggleAll() {
        const ids = paginated.map((u) => u.userId);
        const allSelected = ids.every((id) => selectedIds.includes(id));
        if (allSelected)
            setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
        else setSelectedIds((prev) => [...new Set([...prev, ...ids])]);
    }

    const allCurrentSelected =
        paginated.length > 0 &&
        paginated.every((u) => selectedIds.includes(u.userId));

    function SortIcon({ col }) {
        const active = sortKey === col;
        return (
            <span
                style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    gap: 1,
                    marginLeft: 4,
                    opacity: active ? 1 : 0.35,
                }}
            >
                <svg width="8" height="5" viewBox="0 0 8 5">
                    <path
                        d="M4 0L8 5H0Z"
                        fill={
                            active && sortDir === "asc" ? "#6366f1" : "#94a3b8"
                        }
                    />
                </svg>
                <svg width="8" height="5" viewBox="0 0 8 5">
                    <path
                        d="M4 5L0 0H8Z"
                        fill={
                            active && sortDir === "desc" ? "#6366f1" : "#94a3b8"
                        }
                    />
                </svg>
            </span>
        );
    }

    return (
        <div
            style={{
                fontFamily: "'Sora', 'Segoe UI', sans-serif",
                background: "#f8fafc",
                minHeight: "100vh",
                padding: "32px 24px",
            }}
        >
            <link rel="stylesheet" />

            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 28,
                    flexWrap: "wrap",
                    gap: 16,
                }}
            >
                <div>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: 24,
                            fontWeight: 700,
                            color: "#0f172a",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        User Management
                    </h1>
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: 13.5,
                            color: "#64748b",
                        }}
                    >
                        {meta.totalElements} users across all roles
                    </p>
                </div>
                <button
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#6366f1",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "10px 18px",
                        fontSize: 13.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#4f46e5")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "#6366f1")
                    }
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M7 1v12M1 7h12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                    Add User
                </button>
            </div>

            {/* Stats Row */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                    gap: 14,
                    marginBottom: 24,
                }}
            >
                {[
                    {
                        label: "Total Users",
                        value: meta.totalElements,
                        color: "#6366f1",
                    },
                    {
                        label: "Admins",
                        value: users.filter((u) =>
                            u.roles.some((r) => r.roleName === "ADMIN"),
                        ).length,
                        color: "#f59e0b",
                    },
                    {
                        label: "Teachers",
                        value: users.filter((u) =>
                            u.roles.some((r) => r.roleName === "TEACHER"),
                        ).length,
                        color: "#8b5cf6",
                    },
                    {
                        label: "Students",
                        value: users.filter((u) =>
                            u.roles.some((r) => r.roleName === "STUDENT"),
                        ).length,
                        color: "#3b82f6",
                    },
                    {
                        label: "Verified",
                        value: users.filter((u) => u.verified).length,
                        color: "#10b981",
                    },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            padding: "14px 18px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                        }}
                    >
                        <p
                            style={{
                                margin: 0,
                                fontSize: 11.5,
                                color: "#94a3b8",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                            }}
                        >
                            {stat.label}
                        </p>
                        <p
                            style={{
                                margin: "6px 0 0",
                                fontSize: 26,
                                fontWeight: 700,
                                color: stat.color,
                                lineHeight: 1,
                            }}
                        >
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 14,
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        padding: "16px 20px",
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        flexWrap: "wrap",
                        borderBottom: "1px solid #f1f5f9",
                    }}
                >
                    {/* Search */}
                    <div
                        style={{
                            position: "relative",
                            flex: "1 1 220px",
                            maxWidth: 360,
                        }}
                    >
                        <svg
                            style={{
                                position: "absolute",
                                left: 11,
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                            }}
                            width="15"
                            height="15"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <circle
                                cx="9"
                                cy="9"
                                r="6"
                                stroke="#94a3b8"
                                strokeWidth="2"
                            />
                            <path
                                d="M13.5 13.5l3 3"
                                stroke="#94a3b8"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(0);
                            }}
                            placeholder="Search by name, username, email..."
                            style={{
                                width: "100%",
                                padding: "9px 12px 9px 34px",
                                border: "1.5px solid #e2e8f0",
                                borderRadius: 9,
                                fontSize: 13,
                                color: "#0f172a",
                                background: "#f8fafc",
                                outline: "none",
                                boxSizing: "border-box",
                                transition: "border-color 0.2s",
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor = "#6366f1")
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor = "#e2e8f0")
                            }
                        />
                    </div>

                    {/* Role Filter Tabs */}
                    <div
                        style={{
                            display: "flex",
                            gap: 4,
                            background: "#f1f5f9",
                            borderRadius: 9,
                            padding: 3,
                        }}
                    >
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => {
                                    setRoleFilter(role);
                                    setPage(0);
                                }}
                                style={{
                                    padding: "6px 13px",
                                    borderRadius: 7,
                                    border: "none",
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    background:
                                        roleFilter === role
                                            ? "#fff"
                                            : "transparent",
                                    color:
                                        roleFilter === role
                                            ? "#6366f1"
                                            : "#64748b",
                                    boxShadow:
                                        roleFilter === role
                                            ? "0 1px 3px rgba(0,0,0,0.1)"
                                            : "none",
                                    transition: "all 0.18s",
                                }}
                            >
                                {role === "ALL" ? "All Roles" : role}
                            </button>
                        ))}
                    </div>

                    {selectedIds.length > 0 && (
                        <span
                            style={{
                                marginLeft: "auto",
                                fontSize: 12.5,
                                color: "#6366f1",
                                fontWeight: 600,
                            }}
                        >
                            {selectedIds.length} selected
                        </span>
                    )}
                </div>

                {/* Table */}
                <div style={{ overflowX: "auto" }}>
                    
                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                fontSize: 13.5,
                            }}
                        >
                            <thead>
                                <tr style={{ background: "#f8fafc" }}>
                                    <th
                                        style={{
                                            padding: "12px 16px",
                                            width: 40,
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={allCurrentSelected}
                                            onChange={toggleAll}
                                            style={{
                                                accentColor: "#6366f1",
                                                width: 15,
                                                height: 15,
                                                cursor: "pointer",
                                            }}
                                        />
                                    </th>
                                    {[
                                        { key: "userId", label: "ID" },
                                        { key: "username", label: "User" },
                                        { key: "email", label: "Email" },
                                        { key: null, label: "Roles" },
                                        { key: null, label: "Status" },
                                        { key: "createdAt", label: "Created" },
                                        { key: null, label: "Actions" },
                                    ].map((col) => (
                                        <th
                                            key={col.label}
                                            onClick={
                                                col.key
                                                    ? () => toggleSort(col.key)
                                                    : undefined
                                            }
                                            style={{
                                                padding: "12px 14px",
                                                textAlign: "left",
                                                color: "#64748b",
                                                fontWeight: 600,
                                                fontSize: 11.5,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.06em",
                                                cursor: col.key
                                                    ? "pointer"
                                                    : "default",
                                                whiteSpace: "nowrap",
                                                userSelect: "none",
                                                borderBottom:
                                                    "1px solid #f1f5f9",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {col.label}
                                                {col.key && (
                                                    <SortIcon col={col.key} />
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginated.map((user, idx) => {
                                    const isSelected = selectedIds.includes(
                                        user.userId,
                                    );
                                    const fullName = `${user.firstName} ${user.lastName}`;
                                    const initials = getInitials(
                                        user.firstName,
                                        user.lastName,
                                    );
                                    const avatarColor = getAvatarColor(
                                        user.userId,
                                    );

                                    return (
                                        <tr
                                            key={user.userId}
                                            style={{
                                                background: isSelected
                                                    ? "#f5f3ff"
                                                    : idx % 2 === 0
                                                      ? "#fff"
                                                      : "#fafafa",
                                                borderBottom:
                                                    "1px solid #f1f5f9",
                                                transition: "background 0.15s",
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isSelected)
                                                    e.currentTarget.style.background =
                                                        "#f8f9ff";
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isSelected)
                                                    e.currentTarget.style.background =
                                                        idx % 2 === 0
                                                            ? "#fff"
                                                            : "#fafafa";
                                            }}
                                        >
                                            {/* Checkbox */}
                                            <td
                                                style={{ padding: "13px 16px" }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        toggleSelect(
                                                            user.userId,
                                                        )
                                                    }
                                                    style={{
                                                        accentColor: "#6366f1",
                                                        width: 15,
                                                        height: 15,
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </td>

                                            {/* ID */}
                                            <td
                                                style={{
                                                    padding: "13px 14px",
                                                    color: "#94a3b8",
                                                    fontWeight: 600,
                                                    fontSize: 12,
                                                }}
                                            >
                                                #{user.userId}
                                            </td>

                                            {/* User */}
                                            <td
                                                style={{ padding: "13px 14px" }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 10,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 10,
                                                            background:
                                                                avatarColor,
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            color: "#fff",
                                                            fontWeight: 700,
                                                            fontSize: 13,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontWeight: 600,
                                                                color: "#0f172a",
                                                                fontSize: 13.5,
                                                            }}
                                                        >
                                                            {fullName}
                                                        </p>
                                                        <p
                                                            style={{
                                                                margin: 0,
                                                                fontSize: 12,
                                                                color: "#94a3b8",
                                                            }}
                                                        >
                                                            @{user.username}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td
                                                style={{
                                                    padding: "13px 14px",
                                                    color: "#475569",
                                                    fontSize: 13,
                                                }}
                                            >
                                                {user.email}
                                            </td>

                                            {/* Roles */}
                                            <td
                                                style={{ padding: "13px 14px" }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 5,
                                                        flexWrap: "wrap",
                                                    }}
                                                >
                                                    {user.roles.map((r) => (
                                                        <RoleBadge
                                                            key={r.roleId}
                                                            roleName={
                                                                r.roleName
                                                            }
                                                        />
                                                    ))}
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td
                                                style={{ padding: "13px 14px" }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 5,
                                                        }}
                                                    >
                                                        <VerifiedIcon
                                                            verified={
                                                                user.verified
                                                            }
                                                        />
                                                        <span
                                                            style={{
                                                                fontSize: 12,
                                                                color: user.verified
                                                                    ? "#3b82f6"
                                                                    : "#94a3b8",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {user.verified
                                                                ? "Verified"
                                                                : "Unverified"}
                                                        </span>
                                                    </div>
                                                    <StatusDot
                                                        active={
                                                            user.enabled &&
                                                            !user.locked
                                                        }
                                                        label={
                                                            user.locked
                                                                ? "Locked"
                                                                : user.enabled
                                                                    ? "Active"
                                                                    : "Disabled"
                                                        }
                                                    />
                                                </div>
                                            </td>

                                            {/* Created */}
                                            <td
                                                style={{
                                                    padding: "13px 14px",
                                                    color: "#64748b",
                                                    fontSize: 12.5,
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {formatDate(user.createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td
                                                style={{ padding: "13px 16px" }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: 6,
                                                    }}
                                                >
                                                    {/* Edit */}
                                                    <button
                                                        title="Edit"
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            borderRadius: 8,
                                                            border: "1.5px solid #e2e8f0",
                                                            background: "#fff",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            cursor: "pointer",
                                                            color: "#6366f1",
                                                            transition:
                                                                "all 0.18s",
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background =
                                                                "#eef2ff";
                                                            e.currentTarget.style.borderColor =
                                                                "#6366f1";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background =
                                                                "#fff";
                                                            e.currentTarget.style.borderColor =
                                                                "#e2e8f0";
                                                        }}
                                                    >
                                                        <svg
                                                            width="13"
                                                            height="13"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M14.5 2.5a2.121 2.121 0 013 3L6 17H2v-4L14.5 2.5z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    {/* Delete */}
                                                    <button
                                                        title="Delete"
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                            borderRadius: 8,
                                                            border: "1.5px solid #e2e8f0",
                                                            background: "#fff",
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            cursor: "pointer",
                                                            color: "#ef4444",
                                                            transition:
                                                                "all 0.18s",
                                                        }}
                                                        onClick={() =>
                                                            handleDeleteUser(
                                                                user.id,
                                                            )
                                                        }
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background =
                                                                "#fef2f2";
                                                            e.currentTarget.style.borderColor =
                                                                "#ef4444";
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background =
                                                                "#fff";
                                                            e.currentTarget.style.borderColor =
                                                                "#e2e8f0";
                                                        }}
                                                    >
                                                        <svg
                                                            width="13"
                                                            height="13"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M3 5h14M8 5V3h4v2M6 5v11a1 1 0 001 1h6a1 1 0 001-1V5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    
                </div>

                {/* Footer / Pagination */}
                <div
                    style={{
                        padding: "14px 20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid #f1f5f9",
                        flexWrap: "wrap",
                        gap: 10,
                    }}
                >
                    <p style={{ margin: 0, fontSize: 12.5, color: "#94a3b8" }}>
                        Showing{" "}
                        <strong style={{ color: "#475569" }}>
                            {page * pageSize + 1}–
                            {Math.min((page + 1) * pageSize, filtered.length)}
                        </strong>{" "}
                        of{" "}
                        <strong style={{ color: "#475569" }}>
                            {filtered.length}
                        </strong>{" "}
                        users
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: 5,
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={() => setPage((p) => Math.max(0, p - 1))}
                            disabled={page === 0}
                            style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                border: "1.5px solid #e2e8f0",
                                background: "#fff",
                                cursor: page === 0 ? "not-allowed" : "pointer",
                                fontSize: 12.5,
                                fontWeight: 600,
                                color: page === 0 ? "#cbd5e1" : "#475569",
                                transition: "all 0.18s",
                            }}
                        >
                            Prev
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 8,
                                    border: "1.5px solid",
                                    borderColor:
                                        page === i ? "#6366f1" : "#e2e8f0",
                                    background: page === i ? "#6366f1" : "#fff",
                                    color: page === i ? "#fff" : "#475569",
                                    fontSize: 12.5,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    transition: "all 0.18s",
                                }}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() =>
                                setPage((p) => Math.min(totalPages - 1, p + 1))
                            }
                            disabled={page >= totalPages - 1}
                            style={{
                                padding: "6px 12px",
                                borderRadius: 8,
                                border: "1.5px solid #e2e8f0",
                                background: "#fff",
                                cursor:
                                    page >= totalPages - 1
                                        ? "not-allowed"
                                        : "pointer",
                                fontSize: 12.5,
                                fontWeight: 600,
                                color:
                                    page >= totalPages - 1
                                        ? "#cbd5e1"
                                        : "#475569",
                                transition: "all 0.18s",
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
