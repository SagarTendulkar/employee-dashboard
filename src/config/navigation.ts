import type { IconType } from "react-icons";
import {
    LuBuilding2,
    LuChevronLeft,
    LuLayoutDashboard,
    LuSettings,
    LuUsers,
} from "react-icons/lu";

export interface MenuItem {
    id: string;
    label: string;
    icon: IconType;
    path: string;
}

export const menuItems: MenuItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/",
    },
    {
        id: "employees",
        label: "Employees",
        icon: LuUsers,
        path: "/employees",
    },
    {
        id: "departments",
        label: "Departments",
        icon: LuBuilding2,
        path: "/departments",
    },
    {
        id: "reports",
        label: "Reports",
        icon: LuUsers,
        path: "/reports",
    },
    {
        id: "settings",
        label: "Settings",
        icon: LuSettings,
        path: "/settings",
    },
];

export const sidebarFooter: { label: string; icon: IconType } = {
    label: "Collapse",
    icon: LuChevronLeft,
};
