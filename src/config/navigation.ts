import type { IconType } from "react-icons";
import {
    LuFolderTree,
    LuLayoutDashboard,
    LuSettings,
    LuUsers,
} from "react-icons/lu";

interface MenuItem {
    id: string;
    label: string;
    icon: IconType;
    path: string;
}

export const menuItems: MenuItem[] = [
    { id: "m1", label: "Dashboard", icon: LuLayoutDashboard, path: "/" },
    { id: "m2", label: "Employees", icon: LuUsers, path: "/employees" },
    {
        id: "m3",
        label: "Departments",
        icon: LuFolderTree,
        path: "/departments",
    },
    { id: "m4", label: "Settings", icon: LuSettings, path: "/reports" },
];
