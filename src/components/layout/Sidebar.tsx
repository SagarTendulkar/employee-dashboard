import { menuItems, sidebarFooter } from "@/config/navigation";
import { NavLink, Link } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SidebarProps) => {
    const FooterIcon = sidebarFooter.icon;
    return (
        <aside
            className={`fixed z-40 flex flex-col w-64 h-screen bg-amber-50 border-r border-amber-200 transition-transform duration-200
                md:sticky md:top-0 md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            {/* Logo Container */}
            <div className="h-16 flex items-center px-6 border-b border-amber-200">
                <Link
                    to="/"
                    onClick={onClose}
                    className="text-xl font-bold text-amber-800 tracking-wide"
                >
                    EmployeeMS
                </Link>
            </div>

            <nav className="flex-1 mt-4 px-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.id}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/"}
                                    onClick={onClose}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                                        ${
                                            isActive
                                                ? "bg-amber-100 text-amber-950 shadow-sm"
                                                : "text-amber-900 hover:bg-amber-100"
                                        }`
                                    }
                                >
                                    <Icon className="text-xl text-amber-700 shrink-0" />
                                    <span>{item.label}</span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="border-t border-amber-200 p-4">
                <button className="flex w-full items-center gap-3 font-medium rounded-xl px-4 py-3 text-sm text-amber-900 transition hover:bg-amber-100 hover:text-amber-950">
                    <FooterIcon size={20} />
                    {sidebarFooter.label}
                </button>
            </div>
        </aside>
    );
};

export default SideBar;
