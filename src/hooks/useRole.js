//-Path: "\src\hooks\useRole.js"
import useAuthStore from "../stores/useAuthStore";

export const roles = {
  ADMIN: "ADMIN",
  TEACHER: "TEACHER",
  STUDENT: "STUDENT",
  PARENT: "PARENT",
};

export default function useRole() {
  const { user } = useAuthStore();

  const getRole = () => user?.roles?.map((r) => r.roleName) || [];

  const findRole = () => {
    const userRoles = getRole();
    const roleKeys = Object.keys(roles);

    console.log("User Roles:", userRoles, "Available Roles:", roleKeys);
    return roleKeys.find((r) => userRoles.includes(roles[r]));
  };

  return { getRole, findRole };
}
