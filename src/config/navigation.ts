import type { IconType } from "react-icons";
import {
    LuCalendarCheck2,
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
    { id: "m2", label: "Employees", icon: LuUsers, path: "/" },
    { id: "m3", label: "Departments", icon: LuFolderTree, path: "/" },
    { id: "m4", label: "Attendance", icon: LuCalendarCheck2, path: "/" },
    { id: "m5", label: "Settings", icon: LuSettings, path: "/" },
];
