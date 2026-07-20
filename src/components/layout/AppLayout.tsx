import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Mobile backdrop, shown only while the drawer is open */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                />
            )}

            <div className="flex flex-col flex-1 min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen((prev) => !prev)} />

                <main className="flex-1 p-4 sm:p-6">
                    <Breadcrumb />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
