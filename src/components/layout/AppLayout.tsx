import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Navbar />

                <main className="flex-1 p-6">
                    <Breadcrumb />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
